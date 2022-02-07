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

  draw(
    d: Drawer,
    si: number,
    sj: number,
    ei: number,
    ej: number,
    ox: number,
    oy: number,
    w: number,
    h: number,
    scale: number,
  ) {
    const cw = d.width()
    const ch = d.height()

    const left = ox - si * cw
    const si2 = left >= 0 ? si : si - Math.floor(left) / cw
    const ox2 = left >= 0 ? ox : ox - Math.floor(left)
    const right = ox + ei * cw
    const ei2 = right < w ? ei : ei - Math.floor(right - w) / cw

    const top = oy - sj * ch
    const sj2 = top >= 0 ? sj : sj - Math.floor(top) / ch
    const oy2 = top >= 0 ? oy : oy - Math.floor(top)
    const bottom = oy + ej * ch
    const ej2 = bottom < h ? ej : ej - Math.floor(bottom - h) / ch

    for (let j = sj2; j < ej2; j++) {
      for (let i = si2; i < ei2; i++) {
        const u = ((i % this.w) + this.w) % this.w
        const v = ((j % this.h) + this.h) % this.h
        const c = this.at(u, v)
        const a = c.appearance()
        d.draw(ox2 + i * cw, oy2 + j * ch, scale, a.mode1, a.mode2)
      }
    }
  }
}
