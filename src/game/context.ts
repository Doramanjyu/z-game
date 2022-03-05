import { DialogManagerInterface } from './DialogManager'
import { ItemUpdater } from './item'

export type GameEventContext = {
  updateItems: (updater: ItemUpdater) => void
  dialogManager: DialogManagerInterface
  effectItem: (id: number) => void
}
