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
  readonly item: number

  constructor(
    mode1: number,
    mode2: number,
    typ: number,
    col: CollisionDir,
    item: number,
  ) {
    this.v = { mode1, mode2 }
    this.typ = typ
    this.colDir = col
    this.item = item
  }

  appearance(): Appearance {
    return this.v
  }

  heat(): boolean {
    return this.typ == 2
  }

  collision(): Polygon[] {
    const topOffset = 0.05
    const pol: Polygon[] = []
    if (this.colDir.top) {
      pol.push([
        [0, topOffset],
        [1, topOffset],
      ])
    }
    if (this.colDir.right && this.colDir.bottom && !this.colDir.left) {
      pol.push([
        [1, topOffset],
        [1, 0.9],
        [0.3, 1.4],
        [0, 1.4],
      ])
      return pol
    }
    if (this.colDir.left && this.colDir.bottom && !this.colDir.right) {
      pol.push([
        [1, 1.4],
        [0.7, 1.4],
        [0, 0.9],
        [0, topOffset],
      ])
      return pol
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

  headUpText(): number {
    if (this.item > 0) {
      return 1
    }
    return 0
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
