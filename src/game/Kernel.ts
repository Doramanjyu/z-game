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
  readonly kernelAnime: {
    idle: Anime
    squat: Anime
    jump: Anime
  }
  readonly kernelShadow: Splite

  currentKernel: Anime

  kernelPos!: Vec2
  kernelVel!: Vec2
  kernelJumpPow!: Vec2
  kernelOnGround!: boolean
  kernelDir!: number

  constructor(ctx: CanvasRenderingContext2D, splite: HTMLImageElement) {
    this.kernelAnime = {
      idle: new Anime(ctx, splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [0, 0, 0, 2, 0, 1, 0],
      }),
      squat: new Anime(ctx, splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [3],
      }),
      jump: new Anime(ctx, splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [2, 2, 0, 2, 2, 2, 0],
      }),
    }
    this.currentKernel = this.kernelAnime.idle
    this.kernelShadow = new Splite(ctx, splite, {
      topLeft: [0, 24],
      sz: [12, 12],
    })

    this.reset()
  }

  reset() {
    this.kernelPos = [100, 0]
    this.kernelVel = [0, 0]
    this.kernelOnGround = true
    this.kernelJumpPow = [0, 0]
    this.kernelDir = 0
  }

  tick(cmd: KernelCommand, gameMap: GameMap<MapCell>) {
    if (cmd.left && this.kernelOnGround) {
      this.kernelJumpPow[0]--
      if (this.kernelJumpPow[0] < -4) {
        this.kernelJumpPow[0] = -4
      }
      this.kernelDir = 0
    }
    if (cmd.right && this.kernelOnGround) {
      this.kernelJumpPow[0]++
      if (this.kernelJumpPow[0] > 4) {
        this.kernelJumpPow[0] = 4
      }
      this.kernelDir = 1
    }
    if (
      !cmd.left &&
      !cmd.right &&
      !cmd.space &&
      this.kernelOnGround &&
      this.kernelJumpPow[0] !== 0 &&
      this.kernelJumpPow[1] === 0
    ) {
      this.kernelOnGround = false
      this.kernelVel = [this.kernelJumpPow[0], 2]
      this.kernelJumpPow = [0, 0]
    }

    this.kernelPos[0] += this.kernelVel[0]
    this.kernelPos[1] += this.kernelVel[1]
    const vBottom = this.kernelVel[1] < 0 ? this.kernelVel[1] : 0
    const mpBottom: Vec2 = [
      Math.round((this.kernelPos[0] - 2) / 16),
      Math.round((36 - this.kernelPos[1] - vBottom + 1) / 16),
    ]
    const vUp = this.kernelVel[1] > 0 ? this.kernelVel[1] : 0
    const mpUp: Vec2 = [
      Math.round((this.kernelPos[0] + this.kernelVel[0] - 2) / 16),
      Math.round((36 - this.kernelPos[1] - vUp - 1) / 16),
    ]
    const mpSide: Vec2 = [
      Math.round((this.kernelPos[0] + this.kernelVel[0] - 2) / 16),
      Math.round((36 - this.kernelPos[1]) / 16),
    ]

    this.currentKernel = this.kernelAnime.idle
    if (cmd.space && this.kernelOnGround) {
      this.currentKernel = this.kernelAnime.squat
      this.kernelJumpPow[1] += 2
      if (this.kernelJumpPow[1] > 10) {
        this.kernelJumpPow[1] = 10
      }
    } else {
      if (!cmd.space && this.kernelJumpPow[1] > 0) {
        this.kernelOnGround = false
        this.kernelVel = this.kernelJumpPow
        this.kernelJumpPow = [0, 0]
      }
      if (!this.kernelOnGround) {
        this.kernelVel[1] -= 2
        if (this.kernelVel[1] < -15) {
          this.kernelVel[1] = -15
        }
        if (gameMap.at(mpSide).solid) {
          this.kernelVel[0] = -0.5 * this.kernelVel[0]
        }
        if (gameMap.at(mpUp).solid && this.kernelVel[1] > 0) {
          this.kernelVel[1] = -1
          this.kernelPos[1] = mpUp[1] + 11
        } else if (gameMap.at(mpBottom).solid && this.kernelVel[1] <= 0) {
          this.kernelPos[1] = mpBottom[1] - 2
          this.kernelVel = [0, 0]
          this.kernelOnGround = true
          this.currentKernel = this.kernelAnime.squat
        }
        if (this.kernelVel[1] > 0) {
          this.currentKernel = this.kernelAnime.jump
        } else if (this.kernelVel[1] < 0) {
          this.currentKernel = this.kernelAnime.squat
        }
      }
    }

    if (this.kernelPos[1] < -16 * 6) {
      this.reset()
    }
  }

  draw(scale: number) {
    const kernelMode = this.currentKernel.tick()
    if (this.kernelOnGround) {
      this.kernelShadow.draw(
        [this.kernelPos[0], -this.kernelPos[1] + 93],
        scale,
        kernelMode,
        0,
      )
    }
    this.currentKernel.draw(
      [this.kernelPos[0], -this.kernelPos[1] + 92],
      scale,
      this.kernelDir,
      0,
    )
  }
}
