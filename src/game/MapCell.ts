import { Cell, Appearance } from './lib/GameMap'
import { Polygon } from './lib/Vec'

type CollisionDir = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}
export class MapCell implements Cell {
  readonly v: Appearance
  readonly typ: number
  readonly colDir: CollisionDir

  constructor(mode1: number, mode2: number, typ: number, col: CollisionDir) {
    this.v = { mode1, mode2 }
    this.typ = typ
    this.colDir = col
  }

  appearance(): Appearance {
    return this.v
  }

  heat(): boolean {
    return this.typ == 2
  }

  collision(): Polygon[] {
    let pol: Polygon[] = []
    if (this.colDir.top) {
      pol.push([
        [0, 0.1],
        [1, 0.1],
      ])
    }
    if (this.colDir.right) {
      pol.push([
        [1, 0.1],
        [1, 1.4],
      ])
    }
    if (this.colDir.bottom) {
      pol.push([
        [1, 1.4],
        [0, 1.4],
      ])
    }
    if (this.colDir.left) {
      pol.push([
        [0, 1.4],
        [0, 0.1],
      ])
    }

    return pol
  }
}

export class OverlayMapCell implements Cell {
  readonly v: Appearance

  constructor(mode1: number, mode2: number) {
    this.v = { mode1, mode2 }
  }

  appearance(): Appearance {
    return this.v
  }
}
