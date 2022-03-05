import { GameEventContext } from './context'

export type EventHandler<T> = (e: GameEvent<T>) => void

export class GameEventTarget<T> {
  onArrive: EventHandler<T>[]
  onAction: EventHandler<T>[]

  constructor() {
    this.onArrive = []
    this.onAction = []
  }
}

export type GameEvent<T> = GameEventContext & {
  target: T
}
