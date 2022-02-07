import { Drawer } from './Splite'

export type Appearance = {
  mode1: number
  mode2: number
}

export interface Cell {
  appearance(): Appearance
}

export class GameMap<T extends Cell> {
  readonly w: number
  readonly h: number
  readonly d: Array<T>

  constructor(w: number, h: number, loader: (x: number, y: number) => T) {
    this.w = w
    this.h = h
    this.d = new Array<T>(w * h)
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        this.d[j * w + i] = loader(i, j)
      }
    }
  }

  at(x: number, y: number): T {
    return this.d[y * this.w + x]
  }

  draw(d: Drawer, ox: number, oy: number, cw: number, ch: number) {
    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        const c = this.at(i, j)
        const a = c.appearance()
        d.draw(ox + i * cw, oy + j * ch, a.mode1, a.mode2)
      }
    }
  }
}
