import { CollisionCell, GameMap, cellRange } from './GameMap'
import { Vec2, Polygon, intersected } from './Vec'

type CollisionState = {
  right: boolean
  left: boolean

  bottom?: number
  top?: number
}

export class CollisionMap {
  readonly map: GameMap<CollisionCell>
  readonly cellSz: Vec2

  private scanned: Polygon[]
  private intersection: Polygon[]
  private motion?: Polygon

  constructor(map: GameMap<CollisionCell>, cellSz: Vec2) {
    this.map = map
    this.cellSz = cellSz
    this.scanned = []
    this.intersection = []
  }

  check(a: Vec2, b: Vec2): CollisionState {
    const col: CollisionState = {
      right: false,
      left: false,
    }
    const s: Vec2 = [
      Math.floor(Math.min(a[0], b[0]) / this.cellSz[0] - 0.5),
      Math.floor(Math.min(a[1], b[1]) / this.cellSz[1] - 0.5),
    ]
    const e: Vec2 = [
      Math.floor(Math.max(a[0], b[0]) / this.cellSz[0] + 0.5),
      Math.floor(Math.max(a[1], b[1]) / this.cellSz[1] + 0.5),
    ]
    const motion: [Vec2, Vec2] = [
      [a[0] / this.cellSz[0], a[1] / this.cellSz[1]],
      [b[0] / this.cellSz[0], b[1] / this.cellSz[1]],
    ]
    this.motion = motion
    for (let j = s[1]; j < e[1] + 1; j++) {
      for (let i = s[0]; i < e[0] + 1; i++) {
        const c = this.map.at([i, j])
        c.collision().forEach((pp) => {
          const pol = pp.reduce<Polygon>(
            (acc, p) => (acc.push([i + p[0], j + p[1]]), acc),
            [],
          )
          pol.length > 0 && this.scanned.push(pol)
          for (let k = 0; k < pol.length - 1; k++) {
            if (!intersected(pol[k], pol[k + 1], motion[0], motion[1], 0.005)) {
              continue
            }
            if (pol[k][0] > pol[k + 1][0]) {
              col.top = pol[k][1] + 0.01
            } else if (pol[k][0] < pol[k + 1][0]) {
              col.bottom = pol[k][1] - 0.01
            }
            if (pol[k][1] > pol[k + 1][1]) {
              col.right = true
            } else if (pol[k][1] < pol[k + 1][1]) {
              col.left = true
            }
            this.intersection.push([pol[k], pol[k + 1]])
          }
        })
      }
    }
    return col
  }

  draw(ctx: CanvasRenderingContext2D, o: Vec2, scale: number) {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1

    const v = cellRange(
      this.map.sz,
      this.map.s,
      this.map.e,
      o,
      this.map.screenSize,
      scale,
      1,
    )
    const [cw, ch] = this.cellSz

    ctx.beginPath()
    for (let j = v.s[1]; j < v.e[1]; j++) {
      for (let i = v.s[0]; i < v.e[0]; i++) {
        const c = this.map.at([i, j])
        c.collision().forEach((pp) => {
          pp.forEach((p, c) => {
            const [x, y] = [
              (v.o[0] + cw * (i + p[0])) * scale,
              (v.o[1] + ch * (j + p[1])) * scale,
            ]
            c == 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          })
          ctx.stroke()
        })
      }
    }
    ctx.closePath()

    const xy = (p: Vec2): Vec2 => [
      (v.o[0] + cw * p[0]) * scale,
      (v.o[1] + ch * p[1]) * scale,
    ]
    const drawPolygon = (poly: Polygon[]) => {
      ctx.beginPath()
      poly.forEach((pp) => {
        pp.forEach((p, c) =>
          c == 0 ? ctx.moveTo(...xy(p)) : ctx.lineTo(...xy(p)),
        )
        ctx.stroke()
      })
      ctx.closePath()
    }

    ctx.strokeStyle = 'yellow'
    ctx.lineWidth = 1
    drawPolygon(this.scanned)
    this.scanned = []

    ctx.strokeStyle = 'orange'
    ctx.lineWidth = 5
    drawPolygon(this.intersection)
    this.intersection = []

    if (this.motion) {
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 4
      ctx.beginPath()
      this.motion.forEach((p, c) =>
        c == 0 ? ctx.moveTo(...xy(p)) : ctx.lineTo(...xy(p)),
      )
      ctx.stroke()
      ctx.closePath()
    }
  }
}
