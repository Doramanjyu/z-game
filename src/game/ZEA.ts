import { Anime } from './lib/Anime'

import { NPC, NPCState, InitialNPCState } from './NPC'

export class ZEA extends NPC {
  constructor(sprite: HTMLImageElement, state0: InitialNPCState) {
    super(
      new Anime(sprite, {
        topLeft: [0, 72],
        sz: [24, 24],
        frames: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
          2, 2, 2, 2, 2, 2, 2, 2,
        ],
        patterns: 5,
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
