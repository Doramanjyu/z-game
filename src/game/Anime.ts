import { Splite, SpliteProp } from './Splite'

export type AnimeProp = SpliteProp & {
  frames: number[]
}

export class Anime {
  readonly base: Splite
  readonly prop: AnimeProp
  cnt = 0

  constructor(
    ctx: CanvasRenderingContext2D,
    splite: HTMLImageElement,
    prop: AnimeProp,
  ) {
    this.prop = prop
    this.base = new Splite(ctx, splite, prop)
  }

  draw(x: number, y: number, mode: number) {
    this.base.draw(x, y, this.prop.frames[this.cnt], mode)
  }

  tick() {
    this.cnt = (this.cnt + 1) % this.prop.frames.length
  }
}
