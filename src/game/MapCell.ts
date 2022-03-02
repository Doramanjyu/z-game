import { Cell, Appearance } from './lib/GameMap'
import { Polygon } from './lib/vec'

import { GameEventTarget } from './events'

type CollisionDir = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

class MapCell extends GameEventTarget<MapCell> implements Cell {
  v: { [layer: string]: Appearance }
  typ: number
  colDir: CollisionDir
  meta: string[]

  constructor(
    v: { [layer: string]: Appearance },
    typ: number,
    col: CollisionDir,
    meta: string[],
  ) {
    super()
    this.v = v
    this.typ = typ
    this.colDir = col
    this.meta = meta
  }

  clone(): MapCell {
    return new MapCell(
      Object.keys(this.v).reduce((acc, k) => {
        acc[k] = [...this.v[k]]
        return acc
      }, {} as { [layer: string]: Appearance }),
      this.typ,
      { ...this.colDir },
      [...this.meta],
    )
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

export default MapCell
