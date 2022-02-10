import { Anime } from './lib/Anime'
import { Splite } from './lib/Splite'
import { Vec2 } from './lib/Vec'
import { GameMap } from './lib/GameMap'

import { MapCell } from './MapCell'

type KernelCommand = {
  left: boolean
  right: boolean
  space: boolean
}

type InitialKernelState = {
  pos?: Vec2
  vel?: Vec2
  jumpPow?: Vec2
  onGround?: boolean
  orientation?: number
}

class KernelState {
  pos: Vec2
  vel: Vec2
  jumpPow: Vec2
  onGround: boolean
  orientation: number

  constructor(s: InitialKernelState) {
    this.pos = s.pos || [0, 0]
    this.vel = s.vel || [0, 0]
    this.jumpPow = s.jumpPow || [0, 0]
    this.onGround = s.onGround || true
    this.orientation = s.orientation || 0
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

export class Kernel {
  readonly anime: {
    idle: Anime
    squat: Anime
    jump: Anime
  }
  readonly shadow: Splite

  readonly ellasticCoeff: number

  currentAnime: Anime
  state0: KernelState
  state: KernelState

  constructor(splite: HTMLImageElement, state0: InitialKernelState) {
    this.ellasticCoeff = 0.5

    this.anime = {
      idle: new Anime(splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [0, 0, 0, 2, 0, 1, 0],
      }),
      squat: new Anime(splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [3],
      }),
      jump: new Anime(splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [2, 2, 0, 2, 2, 2, 0],
      }),
    }
    this.currentAnime = this.anime.idle
    this.shadow = new Splite(splite, {
      topLeft: [0, 24],
      sz: [12, 12],
    })

    this.state0 = new KernelState(state0)
    this.state = this.state0.clone()
  }

  reset() {
    this.state = this.state0.clone()
  }

  tick(cmd: KernelCommand, gameMap: GameMap<MapCell>) {
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
      this.state.vel = [this.state.jumpPow[0], -2]
      this.state.jumpPow = [0, 0]
    }

    this.state.pos[0] += this.state.vel[0]
    this.state.pos[1] += this.state.vel[1]
    const vBottom = this.state.vel[1] > 0 ? this.state.vel[1] : 0
    const mpBottom: Vec2 = [
      Math.round((this.state.pos[0] - 2) / 16),
      Math.floor((this.state.pos[1] + vBottom + 1) / 16),
    ]
    const vUp = this.state.vel[1] < 0 ? this.state.vel[1] : 0
    const mpUp: Vec2 = [
      Math.round((this.state.pos[0] + this.state.vel[0] - 2) / 16),
      Math.floor((this.state.pos[1] + vUp - 4) / 16),
    ]
    const mpSide: Vec2 = [
      Math.round((this.state.pos[0] + this.state.vel[0] - 2) / 16),
      Math.floor((this.state.pos[1] - 1) / 16),
    ]

    this.currentAnime = this.anime.idle
    if (cmd.space && this.state.onGround) {
      this.currentAnime = this.anime.squat
      this.state.jumpPow[1] -= 2
      if (this.state.jumpPow[1] < -13) {
        this.state.jumpPow[1] = -13
      }
    } else {
      if (!cmd.space && this.state.jumpPow[1] < 0) {
        this.state.onGround = false
        this.state.vel = this.state.jumpPow
        this.state.jumpPow = [0, 0]
      }
      if (!this.state.onGround) {
        this.state.vel[1] += 2
        if (this.state.vel[1] > 14) {
          this.state.vel[1] = 14
        }
        if (gameMap.at(mpUp).solid && this.state.vel[1] < 0) {
          this.state.vel[1] *= -this.ellasticCoeff
          this.state.vel[0] *= this.ellasticCoeff
          this.state.pos[1] = mpUp[1] * 16 + 16 + 4
        } else if (gameMap.at(mpSide).solid) {
          this.state.vel[0] *= -this.ellasticCoeff
        }
        if (gameMap.at(mpBottom).solid && this.state.vel[1] >= 0) {
          this.state.pos[1] = mpBottom[1] * 16
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
    }

    if (this.state.pos[1] > 16 * 10) {
      this.reset()
    }
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    const kernelMode = this.currentAnime.tick()
    if (this.state.onGround) {
      this.shadow.draw(
        ctx,
        [this.state.pos[0], this.state.pos[1] - 5],
        scale,
        kernelMode,
        0,
      )
    }
    this.currentAnime.draw(
      ctx,
      [this.state.pos[0], this.state.pos[1] - 6],
      scale,
      this.state.orientation,
      0,
    )
  }
}
