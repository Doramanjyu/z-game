import { Cell, Appearance } from './lib/GameMap'

export class MapCell implements Cell {
  readonly v: Appearance
  readonly solid: boolean

  constructor(mode1: number, mode2: number, solid: boolean) {
    this.v = {
      mode1,
      mode2,
    }
    this.solid = solid
  }

  appearance(): Appearance {
    return this.v
  }
}
