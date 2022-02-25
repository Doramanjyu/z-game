import { Anime } from './lib/Anime'
import { Vec2 } from './lib/Vec'

import { GameEventTarget } from './events'

export class NPCState {
  pos: Vec2
  mode: number

  constructor(s: InitialNPCState) {
    this.pos = s.pos || [0, 0]
    this.mode = s.mode || 0
  }
}

export type InitialNPCState = {
  pos?: Vec2
  mode?: number
}

export class NPC<State extends NPCState = NPCState> extends GameEventTarget<
  NPC<State>
> {
  private readonly anime: Anime
  private readonly headUpText: Anime
  state: State
  active: boolean
  hasDialog: boolean

  constructor(anime: Anime, headUpText: Anime, s: State) {
    super()
    this.anime = anime
    this.headUpText = headUpText
    this.state = s
    this.active = false
    this.hasDialog = false
  }

  tick(p: Vec2) {
    const sz = this.anime.sz()
    const activePrev = this.active
    this.active =
      Math.abs(p[0] - this.state.pos[0]) < sz[0] / 2 &&
      Math.abs(p[1] - this.state.pos[1]) < sz[1] / 2

    if (!activePrev && this.active && this.onArrive) {
      this.onArrive.forEach((h) => h({ target: this }))
    }

    this.anime.tick()
    this.headUpText.tick()
  }

  interact() {
    if (this.active && this.onAction.length) {
      this.onAction.forEach((h) => h({ target: this }))
    }
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vec2, scale: number) {
    const sz = this.anime.sz()
    this.anime.draw(
      ctx,
      [
        offset[0] + this.state.pos[0] - sz[0] / 2,
        offset[1] + this.state.pos[1] - sz[1] + 6,
      ],
      scale,
      this.state.mode,
      0,
    )
    if (this.hasDialog) {
      this.headUpText.draw(
        ctx,
        [
          offset[0] + this.state.pos[0] - sz[0] / 2,
          offset[1] + this.state.pos[1] - sz[1] + 4,
        ],
        scale,
        2 + (this.active ? 1 : 0),
        0,
      )
    }
  }
}
