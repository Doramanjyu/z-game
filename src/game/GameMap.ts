import { Drawer } from './Splite'
import { Vec2 } from './Vec'

export type Appearance = {
  mode1: number
  mode2: number
}

export interface Cell {
  appearance(): Appearance
}

export class GameMap<T extends Cell> {
  readonly sz: Vec2
  readonly data: Array<T>
  readonly s: Vec2
  readonly e: Vec2
  readonly screenSize: Vec2

  constructor(
    sz: Vec2,
    loader: (x: number, y: number) => T,
    s: Vec2,
    e: Vec2,
    screenSize: Vec2,
  ) {
    this.sz = sz
    this.s = s
    this.e = e
    this.screenSize = screenSize
    this.data = new Array<T>(sz[0] * sz[1])
    for (let j = 0; j < sz[1]; j++) {
      for (let i = 0; i < sz[0]; i++) {
        this.data[j * sz[0] + i] = loader(i, j)
      }
    }
  }

  at(p: Vec2): T {
    const p2 = posMod(p, this.sz)
    return this.data[p2[1] * this.sz[0] + p2[0]]
  }

  draw(d: Drawer, o: Vec2, scale: number) {
    const [cw, ch] = d.sz()

    const left = o[0] - this.s[0] * cw
    const si2 = left >= 0 ? this.s[0] : this.s[0] - Math.floor(left) / cw
    const ox2 = left >= 0 ? o[0] : o[0] - Math.floor(left)
    const right = o[0] + this.e[0] * cw
    const ei2 =
      right < this.screenSize[0]
        ? this.e[0]
        : this.e[0] - Math.floor(right - this.screenSize[0]) / cw

    const top = o[1] - this.s[1] * ch
    const sj2 = top >= 0 ? this.s[1] : this.s[1] - Math.floor(top) / ch
    const oy2 = top >= 0 ? o[1] : o[1] - Math.floor(top)
    const bottom = o[1] + this.e[1] * ch
    const ej2 =
      bottom < this.screenSize[1]
        ? this.e[1]
        : this.e[1] - Math.floor(bottom - this.screenSize[1]) / ch

    for (let j = sj2; j < ej2; j++) {
      for (let i = si2; i < ei2; i++) {
        const c = this.at([i, j])
        const a = c.appearance()
        d.draw([ox2 + i * cw, oy2 + j * ch], scale, a.mode1, a.mode2)
      }
    }
  }
}

const posMod = (a: Vec2, b: Vec2): Vec2 => {
  const m = [a[0] % b[0], a[1] % b[1]]
  return [m[0] < 0 ? m[0] + b[0] : m[0], m[1] < 0 ? m[1] + b[1] : m[1]]
}
