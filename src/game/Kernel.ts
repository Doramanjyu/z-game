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

export class Kernel {
  readonly anime: {
    idle: Anime
    squat: Anime
    jump: Anime
  }
  readonly shadow: Splite

  readonly ellasticCoeff: number

  currentAnime: Anime

  pos!: Vec2
  vel!: Vec2
  jumpPow!: Vec2
  onGround!: boolean
  orientation!: number

  constructor(splite: HTMLImageElement) {
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

    this.reset()
  }

  reset() {
    this.pos = [100, 96]
    this.vel = [0, 0]
    this.onGround = true
    this.jumpPow = [0, 0]
    this.orientation = 0
  }

  tick(cmd: KernelCommand, gameMap: GameMap<MapCell>) {
    if (cmd.left && this.onGround) {
      this.jumpPow[0]--
      if (this.jumpPow[0] < -4) {
        this.jumpPow[0] = -4
      }
      this.orientation = 0
    }
    if (cmd.right && this.onGround) {
      this.jumpPow[0]++
      if (this.jumpPow[0] > 4) {
        this.jumpPow[0] = 4
      }
      this.orientation = 1
    }
    if (
      !cmd.left &&
      !cmd.right &&
      !cmd.space &&
      this.onGround &&
      this.jumpPow[0] !== 0 &&
      this.jumpPow[1] === 0
    ) {
      this.onGround = false
      this.vel = [this.jumpPow[0], -2]
      this.jumpPow = [0, 0]
    }

    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
    const vBottom = this.vel[1] > 0 ? this.vel[1] : 0
    const mpBottom: Vec2 = [
      Math.round((this.pos[0] - 2) / 16),
      Math.floor((this.pos[1] + vBottom + 1) / 16),
    ]
    const vUp = this.vel[1] < 0 ? this.vel[1] : 0
    const mpUp: Vec2 = [
      Math.round((this.pos[0] + this.vel[0] - 2) / 16),
      Math.floor((this.pos[1] + vUp - 4) / 16),
    ]
    const mpSide: Vec2 = [
      Math.round((this.pos[0] + this.vel[0] - 2) / 16),
      Math.floor((this.pos[1] - 1) / 16),
    ]

    this.currentAnime = this.anime.idle
    if (cmd.space && this.onGround) {
      this.currentAnime = this.anime.squat
      this.jumpPow[1] -= 2
      if (this.jumpPow[1] < -13) {
        this.jumpPow[1] = -13
      }
    } else {
      if (!cmd.space && this.jumpPow[1] < 0) {
        this.onGround = false
        this.vel = this.jumpPow
        this.jumpPow = [0, 0]
      }
      if (!this.onGround) {
        this.vel[1] += 2
        if (this.vel[1] > 14) {
          this.vel[1] = 14
        }
        if (gameMap.at(mpUp).solid && this.vel[1] < 0) {
          this.vel[1] *= -this.ellasticCoeff
          this.vel[0] *= this.ellasticCoeff
          this.pos[1] = mpUp[1] * 16 + 16 + 4
        } else if (gameMap.at(mpSide).solid) {
          this.vel[0] *= -this.ellasticCoeff
        }
        if (gameMap.at(mpBottom).solid && this.vel[1] >= 0) {
          this.pos[1] = mpBottom[1] * 16
          this.vel = [0, 0]
          this.onGround = true
          this.currentAnime = this.anime.squat
        }
        if (this.vel[1] < 0) {
          this.currentAnime = this.anime.jump
        } else if (this.vel[1] > 0) {
          this.currentAnime = this.anime.squat
        }
      }
    }

    if (this.pos[1] > 16 * 10) {
      this.reset()
    }
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    const kernelMode = this.currentAnime.tick()
    if (this.onGround) {
      this.shadow.draw(
        ctx,
        [this.pos[0], this.pos[1] - 5],
        scale,
        kernelMode,
        0,
      )
    }
    this.currentAnime.draw(
      ctx,
      [this.pos[0], this.pos[1] - 6],
      scale,
      this.orientation,
      0,
    )
  }
}
