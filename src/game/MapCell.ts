import { Cell, Appearance } from './lib/GameMap'
import { Polygon } from './lib/Vec'

import { GameEventTarget } from './events'

type CollisionDir = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

export class MapCell extends GameEventTarget<MapCell> implements Cell {
  readonly v: { [layer: string]: Appearance }
  readonly typ: number
  readonly colDir: CollisionDir

  constructor(
    v: { [layer: string]: Appearance },
    typ: number,
    col: CollisionDir,
  ) {
    super()
    this.v = v
    this.typ = typ
    this.colDir = col
  }

  appearance(layer: string): Appearance {
    return this.v[layer]
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
    if (this.onAction.length > 0) {
      return 1
    }
    if (this.typ == 2) {
      return 2
    }
    return 0
  }
}
