export class GameEventTarget<T> {
  onArrive?: (e: GameEvent<T>) => void
  onAction?: (e: GameEvent<T>) => void
}

export type GameEvent<T> = {
  target: T
}
