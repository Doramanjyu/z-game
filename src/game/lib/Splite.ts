import { Vec2 } from './Vec'

export interface Drawer {
  draw(s: Vec2, scale: number, mode1: number, mode2: number): void
  sz(): Vec2
}

export type SpliteProp = {
  topLeft: Vec2
  sz: Vec2
}

export class Splite implements Drawer {
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly prop: SpliteProp

  constructor(
    ctx: CanvasRenderingContext2D,
    splite: HTMLImageElement,
    prop: SpliteProp,
  ) {
    this.ctx = ctx
    this.splite = splite
    this.prop = prop
  }

  draw(p: Vec2, scale: number, mode1: number, mode2: number) {
    this.ctx.drawImage(
      this.splite,
      this.prop.topLeft[0] + mode1 * this.prop.sz[0],
      this.prop.topLeft[1] + mode2 * this.prop.sz[1],
      this.prop.sz[0],
      this.prop.sz[1],
      p[0] * scale,
      p[1] * scale,
      this.prop.sz[0] * scale,
      this.prop.sz[1] * scale,
    )
  }

  sz() {
    return this.prop.sz
  }
}
