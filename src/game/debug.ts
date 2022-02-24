import { Sprite } from './lib/Sprite'
import { Vec2 } from './lib/Vec'

export class DebugUI {
  readonly ui: Sprite

  debugCursor: Vec2
  fn?: () => void

  constructor(sprite: HTMLImageElement) {
    this.debugCursor = [0, 0]
    this.ui = new Sprite(sprite, {
      topLeft: [992, 0],
      sz: [16, 16],
    })
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vec2, scale: number) {
    const [cw, ch] = this.ui.sz()
    this.ui.draw(
      ctx,
      [
        this.debugCursor[0] * cw + (offset[0] % cw),
        this.debugCursor[1] * ch + (offset[1] % ch),
      ],
      scale,
      0,
      0,
    )
  }

  move(d: Vec2) {
    this.debugCursor[0] += d[0]
    this.debugCursor[1] += d[1]
    if (this.debugCursor[1] < 0) {
      this.debugCursor[1] = 0
    } else if (this.debugCursor[1] > 10) {
      this.debugCursor[1] = 10
    }
    if (this.debugCursor[0] < 0) {
      this.debugCursor[0] = 0
    } else if (this.debugCursor[0] > 13) {
      this.debugCursor[0] = 13
    }
  }

  do(fn: () => void) {
    this.fn = fn
  }

  done(): boolean {
    if (this.fn) {
      this.fn()
      this.fn = undefined
      return true
    }
    return false
  }

  getGrid(offset: Vec2): Vec2 {
    return [
      Math.floor((this.debugCursor[0] * 16 - offset[0]) / 16),
      Math.floor((this.debugCursor[1] * 16 - offset[1]) / 16),
    ]
  }
}
