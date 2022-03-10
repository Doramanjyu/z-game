import Anime from './lib/Anime'

import NPC, { NPCState, InitialNPCState } from './NPC'

import { GameEventContext } from './context'

class Nggis extends NPC {
  constructor(
    ec: GameEventContext,
    sprite: HTMLImageElement,
    state0: InitialNPCState,
  ) {
    super(
      ec,
      new Anime(sprite, {
        topLeft: [0, 96],
        sz: [12, 12],
        frames: [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1],
        patterns: 3,
        countDiv: 2,
      }),
      new Anime(sprite, {
        topLeft: [0, 60],
        sz: [24, 12],
        frames: [0, 1],
        patterns: 2,
        countDiv: 8,
      }),
      new NPCState(state0),
    )
  }
}

export default Nggis
