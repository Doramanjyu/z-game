import { Drawer } from './Sprite'
import { CollisionCell, GameMap, cellRange } from './GameMap'
import { Vec2 } from './Vec'

export class CollisionMap {
  readonly map: GameMap<CollisionCell>

  constructor(map: GameMap<CollisionCell>) {
    this.map = map
  }

  draw(ctx: CanvasRenderingContext2D, d: Drawer, o: Vec2, scale: number) {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1

    const v = cellRange(
      this.map.sz,
      this.map.s,
      this.map.e,
      o,
      this.map.screenSize,
      scale,
    )
    const [cw, ch] = d.sz()

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
  }
}
