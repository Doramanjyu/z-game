import { Drawer } from './Sprite'
import { Vec2, Polygon } from './Vec'

export type Appearance = {
  mode1: number
  mode2: number
}

export interface Cell {
  appearance(): Appearance
}

export interface CollisionCell extends Cell {
  collision(): Polygon[]
}

export class GameMap<T extends Cell> {
  readonly sz: Vec2
  readonly data: Array<T>
  readonly s: Vec2
  readonly e: Vec2
  readonly screenSize: Vec2
  readonly baseScale: number

  constructor(
    sz: Vec2,
    loader: (x: number, y: number) => T,
    s: Vec2,
    e: Vec2,
    screenSize: Vec2,
    baseScale = 1,
  ) {
    this.sz = sz
    this.s = s
    this.e = e
    this.screenSize = screenSize
    this.baseScale = baseScale
    this.data = new Array<T>(sz[0] * sz[1])
    for (let j = 0; j < sz[1]; j++) {
      for (let i = 0; i < sz[0]; i++) {
        this.data[j * sz[0] + i] = loader(i, j)
      }
    }
  }

  at(p: Vec2): T {
    const p2 = posMod([Math.floor(p[0]), Math.floor(p[1])], this.sz)
    return this.data[p2[1] * this.sz[0] + p2[0]]
  }

  set(p: Vec2, v: T) {
    const p2 = posMod([Math.floor(p[0]), Math.floor(p[1])], this.sz)
    this.data[p2[1] * this.sz[0] + p2[0]] = v
  }

  draw(ctx: CanvasRenderingContext2D, d: Drawer, o: Vec2, scale: number) {
    const v = cellRange(
      d.sz(),
      this.s,
      this.e,
      o,
      this.screenSize,
      scale,
      this.baseScale,
    )
    const [cw, ch] = d.sz()

    for (let j = v.s[1]; j < v.e[1]; j++) {
      for (let i = v.s[0]; i < v.e[0]; i++) {
        const c = this.at([i, j])
        const a = c.appearance()
        d.draw(ctx, [v.o[0] + i * cw, v.o[1] + j * ch], scale, a.mode1, a.mode2)
      }
    }
  }
}

const posMod = (a: Vec2, b: Vec2): Vec2 => {
  const m = [a[0] % b[0], a[1] % b[1]]
  return [m[0] < 0 ? m[0] + b[0] : m[0], m[1] < 0 ? m[1] + b[1] : m[1]]
}

export const cellRange = (
  sz: Vec2,
  s: Vec2,
  e: Vec2,
  o: Vec2,
  screenSize: Vec2,
  scale: number,
  baseScale: number,
): {
  s: Vec2
  e: Vec2
  o: Vec2
} => {
  o[0] = Math.floor(o[0])
  o[1] = Math.floor(o[1])

  const gw = Math.round(screenSize[0] / (sz[0] * scale)) + 2
  const gh = Math.round(screenSize[1] / (sz[1] * scale)) + 2

  const left = o[0] + s[0] * sz[0] + sz[0]
  const top = o[1] + s[1] * sz[1] + sz[1]

  const si2 = left >= 0 ? s[0] : s[0] - Math.floor(left / sz[0]) - baseScale + 1
  const ei2 = si2 + gw + baseScale - 1

  const sj2 = top >= 0 ? s[1] : s[1] - Math.floor(top / sz[1]) - baseScale + 1
  const ej2 = sj2 + gh + baseScale - 1

  return {
    s: [si2, sj2],
    e: [ei2, ej2],
    o,
  }
}
