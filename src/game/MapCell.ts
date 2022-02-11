import { Cell, Appearance } from './lib/GameMap'

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
