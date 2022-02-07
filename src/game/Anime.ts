import { Vec2 } from './Vec'
import { Splite, SpliteProp, Drawer } from './Splite'

export type AnimeProp = SpliteProp & {
  frames: number[]
  patterns?: number
}

export class Anime extends Splite implements Drawer {
  readonly prop: AnimeProp
  readonly patterns: number
  cnt = 0

  constructor(
    ctx: CanvasRenderingContext2D,
    splite: HTMLImageElement,
    prop: AnimeProp,
  ) {
    super(ctx, splite, prop)
    this.prop = prop
    if (prop.patterns) {
      this.patterns = prop.patterns
    } else {
      this.patterns = prop.frames.reduce((acc, v) => (acc > v ? acc : v), 0)
    }
  }

  draw(p: Vec2, scale: number, mode1: number, mode2: number) {
    super.draw(
      p,
      scale,
      this.prop.frames[this.cnt] + this.patterns * mode2,
      mode1,
    )
  }

  tick() {
    this.cnt = (this.cnt + 1) % this.prop.frames.length
  }
}
