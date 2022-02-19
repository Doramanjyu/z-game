import { Vec2 } from './Vec'
import { Sprite, SpriteProp, Drawer } from './Sprite'

export type AnimeProp = SpriteProp & {
  frames: number[]
  patterns?: number
  countDiv?: number
}

export class Anime extends Sprite implements Drawer {
  readonly propAnime: AnimeProp
  private readonly patterns: number
  private readonly countDiv: number
  private cnt = 0
  frame = 0

  constructor(sprite: HTMLImageElement, prop: AnimeProp) {
    super(sprite, prop)
    this.propAnime = prop
    if (prop.patterns) {
      this.patterns = prop.patterns
    } else {
      this.patterns = prop.frames.reduce((acc, v) => (acc > v ? acc : v), 0)
    }
    if (prop.countDiv) {
      this.countDiv = prop.countDiv
    } else {
      this.countDiv = 1
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    p: Vec2,
    scale: number,
    mode1: number,
    mode2: number,
  ) {
    super.draw(
      ctx,
      p,
      scale,
      this.propAnime.frames[this.frame] + this.patterns * mode2,
      mode1,
    )
  }

  tick(forceCnt?: number): number {
    if (forceCnt !== undefined) {
      this.cnt = forceCnt
    }
    this.frame = Math.floor(
      (this.cnt / this.countDiv) % this.propAnime.frames.length,
    )
    this.cnt++
    return this.propAnime.frames[this.frame]
  }
}
