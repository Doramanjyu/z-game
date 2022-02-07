export interface Drawer {
  draw(x: number, y: number, mode1: number, mode2: number): void
}

export type SpliteProp = {
  sx: number
  sy: number
  w: number
  h: number
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

  draw(x: number, y: number, mode1: number, mode2: number) {
    this.ctx.drawImage(
      this.splite,
      this.prop.sx + mode1 * this.prop.w,
      this.prop.sy + mode2 * this.prop.h,
      this.prop.w,
      this.prop.h,
      x * 3,
      y * 3,
      this.prop.w * 3,
      this.prop.h * 3,
    )
  }
}
