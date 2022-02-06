export type AnimeProp = {
  sx: number
  sy: number
  w: number
  h: number
  frames: number[]
}

export class Anime {
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly prop: AnimeProp
  cnt = 0

  constructor(
    ctx: CanvasRenderingContext2D,
    splite: HTMLImageElement,
    prop: AnimeProp,
  ) {
    [this.ctx, this.splite, this.prop] = [ctx, splite, prop]
  }

  draw(x: number, y: number, mode: number) {
    this.ctx.drawImage(
      this.splite,
      this.prop.sx + this.prop.frames[this.cnt] * this.prop.w,
      this.prop.sy + mode * this.prop.h,
      this.prop.w,
      this.prop.h,
      x * 3,
      y * 3,
      this.prop.w * 3,
      this.prop.h * 3,
    )
  }

  tick() {
    this.cnt = (this.cnt + 1) % this.prop.frames.length
  }
}
