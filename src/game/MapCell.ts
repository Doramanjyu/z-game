import { Cell, Appearance } from './lib/GameMap'
import { Polygon } from './lib/Vec'

export class MapCell implements Cell {
  readonly v: Appearance
  readonly typ: number

  constructor(mode1: number, mode2: number, typ: number) {
    this.v = { mode1, mode2 }
    this.typ = typ
  }

  appearance(): Appearance {
    return this.v
  }

  occupied(): boolean {
    return this.typ == 1
  }

  step(): boolean {
    return this.typ > 0
  }

  heat(): boolean {
    return this.typ == 2
  }

  collision(): Polygon[] {
    switch (this.typ) {
      default:
        return []
      case 1:
        return [
          [
            [0, 0.1],
            [1, 0.1],
            [1, 1.4],
            [0, 1.4],
            [0, 0.1],
          ],
        ]
      case 2:
      case 3:
        return [
          [
            [0, 0.1],
            [1, 0.1],
          ],
        ]
    }
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
