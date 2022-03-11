import { Cell, Appearance } from './lib/GameMap'
import { Polygon } from './lib/vec'

import { GameEventContext } from './context'
import { GameEventTarget } from './event'
import { itemLabels } from './item'

type CollisionDir = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

export const enum CellType {
  None = 0,
  Occupied = 1,
  Heat = 2,
  Step = 3,
  GameOver = 4,
}

class MapCell extends GameEventTarget<MapCell> implements Cell {
  private readonly eventCtx: GameEventContext
  v: { [layer: string]: Appearance }
  typ: CellType
  colDir: CollisionDir
  meta: string[]
  override: { [layer: string]: () => Appearance | null }
  numItems: number
  state: {
    itemsEarned: number
  }

  constructor(
    ec: GameEventContext,
    v: { [layer: string]: Appearance },
    typ: CellType,
    col: CollisionDir,
    meta: string[],
  ) {
    super()
    this.eventCtx = ec
    this.v = v
    this.typ = typ
    this.colDir = col
    this.meta = meta
    this.override = {}
    this.state = {
      itemsEarned: 0,
    }

    const items = meta.reduce<number[]>((acc, m) => {
      const [t, v] = m.split('.')
      if (t === 'item') {
        acc.push(parseInt(v))
      }
      return acc
    }, [])
    this.numItems = items.length
    if (this.numItems > 0) {
      const self = this
      this.override['overlayAnime'] = (): Appearance | null => {
        if (self.state.itemsEarned < items.length) {
          return [0, 2]
        }
        return null
      }
      this.onAction.push((e) => {
        if (e && self.state.itemsEarned < self.numItems) {
          e.updateItems((itemsPrev) => {
            const id = items[self.state.itemsEarned]
            e.effectItem(id)
            itemsPrev.push({
              id: id,
              label: itemLabels[id],
              onUse: () => {
                e.updateItems((itemsPrev) =>
                  itemsPrev.filter((item) => item.id !== id),
                )
                if (id === 0) {
                  e.dialogManager.showMessage('Nyoh, biji', { timeout: 2000 })
                }
              },
            })
            return itemsPrev
          })
          self.state.itemsEarned += 1
        }
      })
    }
  }

  clone(): MapCell {
    return new MapCell(
      this.eventCtx,
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
    if (layer in this.override) {
      const overriden = this.override[layer]()
      if (overriden) {
        return overriden
      }
    }
    return this.v[layer]
  }

  heat(): boolean {
    return this.typ == CellType.Heat
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
    if (this.state.itemsEarned < this.numItems) {
      return 1
    }
    if (this.typ == CellType.Heat) {
      return 2
    }
    return 0
  }
}

export default MapCell
