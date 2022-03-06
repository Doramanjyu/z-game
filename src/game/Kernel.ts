import Anime from './lib/Anime'
import Sprite from './lib/Sprite'
import { Vec2 } from './lib/vec'
import GameMap from './lib/GameMap'
import CollisionMap from './lib/CollisionMap'

import MapCell from './MapCell'
import { GameEventContext } from './context'

const heatCount = 8
const popResume = 96

type KernelCommand = {
  left: boolean
  right: boolean
  space: boolean
}

type InitialKernelState = {
  pos?: Vec2
  vel?: Vec2
  onGround?: boolean
  orientation?: number
}

class KernelState {
  pos: Vec2
  vel: Vec2
  onGround: boolean
  orientation: number

  jumpPow: Vec2
  heat: number
  popped: number
  trans: number

  constructor(s: InitialKernelState) {
    this.pos = s.pos || [0, 0]
    this.vel = s.vel || [0, 0]
    this.onGround = s.onGround || true
    this.orientation = s.orientation || 0
    this.jumpPow = [0, 0]
    this.heat = 0
    this.popped = 0
    this.trans = 0
  }

  clone(): KernelState {
    return {
      ...this,
      pos: [this.pos[0], this.pos[1]],
      vel: [this.vel[0], this.vel[1]],
      jumpPow: [this.jumpPow[0], this.jumpPow[1]],
    }
  }
}

class Kernel {
  private readonly eventCtx: GameEventContext
  private readonly anime: {
    idle: Anime
    squat: Anime
    jump: Anime
  }
  private readonly shadow: Sprite
  private readonly trans: Sprite
  private readonly explosion: Sprite
  private readonly headUpText: Anime
  private readonly item: Sprite
  private readonly ellasticCoeff: number
  private currentAnime: Anime
  private state0: KernelState
  private interacting: boolean
  private earnedItem?: {
    id: number
    effectCnt: number
  }

  readonly effectItem: (id: number) => void

  onInteract?: () => void

  state: KernelState
  explosionPos: Vec2
  explosionNum: number
  headUpTextMode: number

  constructor(
    ec: GameEventContext,
    sprite: HTMLImageElement,
    state0: InitialKernelState,
  ) {
    this.eventCtx = ec
    this.ellasticCoeff = 0.5

    this.anime = {
      idle: new Anime(sprite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [0, 0, 0, 2, 0, 1, 0],
        patterns: 4,
      }),
      squat: new Anime(sprite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [3],
        patterns: 4,
      }),
      jump: new Anime(sprite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [2, 2, 0, 2, 2, 2, 0],
        patterns: 4,
      }),
    }
    this.currentAnime = this.anime.idle
    this.shadow = new Sprite(sprite, {
      topLeft: [0, 24],
      sz: [12, 12],
    })
    this.trans = new Sprite(sprite, {
      topLeft: [0, 36],
      sz: [12, 12],
    })
    this.explosion = new Sprite(sprite, {
      topLeft: [0, 48],
      sz: [36, 12],
    })
    this.headUpText = new Anime(sprite, {
      topLeft: [0, 60],
      sz: [24, 12],
      frames: [0, 1],
      patterns: 2,
      countDiv: 8,
    })
    this.item = new Sprite(sprite, {
      topLeft: [512, 0],
      sz: [12, 12],
    })

    this.state0 = new KernelState(state0)
    this.state = this.state0.clone()

    this.explosionPos = this.state.pos
    this.explosionNum = 0
    this.headUpTextMode = 0
    this.interacting = false

    const self = this
    this.effectItem = (id: number): void => {
      self.earnedItem = {
        id: id,
        effectCnt: 0,
      }
    }
  }

  reset() {
    this.state = this.state0.clone()
  }

  mapPos() {
    const mp: Vec2 = [
      Math.round((this.state.pos[0] - 2) / 16),
      Math.floor(this.state.pos[1] / 16),
    ]
    return mp
  }

  tick(cmd: KernelCommand, gameMap: GameMap<MapCell>, colMap: CollisionMap) {
    if (cmd.left && this.state.onGround) {
      this.state.jumpPow[0]--
      if (this.state.jumpPow[0] < -4) {
        this.state.jumpPow[0] = -4
      }
      this.state.orientation = 0
    }
    if (cmd.right && this.state.onGround) {
      this.state.jumpPow[0]++
      if (this.state.jumpPow[0] > 4) {
        this.state.jumpPow[0] = 4
      }
      this.state.orientation = 1
    }
    if (
      !cmd.left &&
      !cmd.right &&
      !cmd.space &&
      this.state.onGround &&
      this.state.jumpPow[0] !== 0 &&
      this.state.jumpPow[1] === 0
    ) {
      this.state.onGround = false
      this.state.vel = [this.state.jumpPow[0], -4]
      this.state.jumpPow = [0, 0]
    }
    let interacting = false
    if (!cmd.space || !this.state.onGround) {
      if (
        this.state.jumpPow[0] == 0 &&
        this.state.jumpPow[1] < 0 &&
        this.state.jumpPow[1] > -4
      ) {
        interacting = true
      } else if (!cmd.space && this.state.jumpPow[1] < 0) {
        this.state.onGround = false
        if (this.state.popped == 0) {
          this.state.vel = this.state.jumpPow
        } else {
          this.state.vel = [this.state.jumpPow[0], this.state.jumpPow[1] * 0.5]
        }
        this.state.jumpPow = [0, 0]
      } else if (!this.state.onGround) {
        if (this.state.popped == 0) {
          this.state.vel[1] += 2
        } else {
          this.state.vel[1] += 1.5
        }
        if (this.state.vel[1] > 14) {
          this.state.vel[1] = 14
        }
      }
    }

    const mpBottom = this.mapPos()
    const col = colMap.check(
      [this.state.pos[0] + 6, this.state.pos[1]],
      [
        this.state.pos[0] + this.state.vel[0] + 6,
        this.state.pos[1] + this.state.vel[1],
      ],
    )
    const headUpTextModePrev = this.headUpTextMode
    this.headUpTextMode = gameMap.at(mpBottom).headUpText()
    if (this.headUpTextMode > 0 && headUpTextModePrev == 0) {
      this.headUpText.tick(0)
    }

    this.currentAnime = this.anime.idle
    if (cmd.space && this.state.onGround) {
      this.currentAnime = this.anime.squat
      this.state.jumpPow[1] -= 2
      if (this.state.jumpPow[1] < -11) {
        this.state.jumpPow[1] = -11
      }
    } else if (!this.state.onGround) {
      if (col.top && this.state.vel[1] < 0) {
        this.state.vel[1] *= -this.ellasticCoeff
        this.state.vel[0] *= this.ellasticCoeff
        this.state.pos[1] = col.top * 16
      }
      if (
        (col.left && this.state.vel[0] < 0) ||
        (col.right && this.state.vel[0] > 0)
      ) {
        this.state.vel[0] *= -this.ellasticCoeff
        this.state.pos[0] += this.state.vel[0]
      }
      if (col.bottom && this.state.vel[1] >= 0) {
        this.state.pos[1] = col.bottom * 16
        this.state.vel = [0, 0]
        this.state.onGround = true
        this.currentAnime = this.anime.squat
      }
      if (this.state.vel[1] < 0) {
        this.currentAnime = this.anime.jump
      } else if (this.state.vel[1] > 0) {
        this.currentAnime = this.anime.squat
      }
    }

    this.state.pos[0] += this.state.vel[0]
    this.state.pos[1] += this.state.vel[1]

    const decreasePopped = (dec = 1) => {
      if (this.state.popped > 0) {
        this.state.popped -= dec
        this.state.heat = 0
        if (this.state.popped < 0) {
          this.state.popped = 0
        }
      }
    }
    if (this.explosionNum && this.explosionNum > 0) {
      this.explosionNum--
      if (this.explosionNum == 2) {
        this.state.heat = 5 * heatCount
        this.state.popped = popResume

        this.state.onGround = false
        this.state.vel = [0, -17]
        this.state.jumpPow = [0, 0]
      }
    } else if (gameMap.at(mpBottom).heat()) {
      this.state.heat++
      if (this.state.heat > 5 * heatCount - 2 && this.state.popped == 0) {
        this.explosionPos = [this.state.pos[0], this.state.pos[1]]
        this.explosionNum = 3
      }
    } else {
      this.state.heat--
      if (this.state.heat < 0) {
        this.state.heat = 0
      }
      decreasePopped()
    }
    if (this.state.trans < 8) {
      this.state.trans++
    }

    if (interacting && !this.interacting) {
      this.state.jumpPow = [0, 0]
      decreasePopped(10)

      const mpBottom0: Vec2 = [
        Math.round((this.state.pos[0] - 2) / 16),
        Math.floor(this.state.pos[1] / 16),
      ]
      const cell = gameMap.at(mpBottom0)
      cell.onAction.forEach((h) => h({ ...this.eventCtx, target: cell }))
      this.onInteract && this.onInteract()
    }
    this.interacting = interacting

    if (this.earnedItem) {
      this.earnedItem.effectCnt += 1
      if (this.earnedItem.effectCnt > 12) {
        this.earnedItem = undefined
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vec2, scale: number) {
    const kernelMode = this.currentAnime.tick()
    if (this.headUpTextMode > 0) {
      this.headUpText.tick()
    }
    const mode =
      (this.state.popped > 0 && this.state.popped != 2) ||
      this.state.heat == heatCount * 5 - 1
        ? 5
        : Math.min(4, Math.floor(this.state.heat / heatCount))
    if (this.state.onGround) {
      this.shadow.draw(
        ctx,
        [offset[0] + this.state.pos[0], offset[1] + this.state.pos[1] - 5],
        scale,
        mode * 4 + kernelMode,
        0,
      )
    }
    if (this.state.trans > 2) {
      this.currentAnime.draw(
        ctx,
        [offset[0] + this.state.pos[0], offset[1] + this.state.pos[1] - 6],
        scale,
        mode,
        this.state.orientation,
      )
    }
    if (this.state.trans < 8) {
      this.trans.draw(
        ctx,
        [offset[0] + this.state.pos[0], offset[1] + this.state.pos[1] - 5],
        scale,
        this.state.trans - 2,
        0,
      )
    }
    if (this.explosionNum > 0) {
      this.explosion.draw(
        ctx,
        [
          offset[0] + this.explosionPos[0] - 12,
          offset[1] + this.explosionPos[1] - 8,
        ],
        scale,
        3 - this.explosionNum,
        0,
      )
    }
    if (this.headUpTextMode > 0) {
      this.headUpText.draw(
        ctx,
        [offset[0] + this.state.pos[0] - 6, offset[1] + this.state.pos[1] - 15],
        scale,
        this.headUpTextMode - 1,
        0,
      )
    }
    if (this.earnedItem) {
      const opacity = 1 - Math.ceil((this.earnedItem.effectCnt - 1) / 3) / 4
      this.item.draw(
        ctx,
        [
          offset[0] + this.state.pos[0],
          offset[1] + this.state.pos[1] - 12 - this.earnedItem.effectCnt,
        ],
        scale,
        this.earnedItem.id,
        0,
        { opacity },
      )
    }
  }
}

export default Kernel
