import { Anime } from './lib/Anime'
import { Vec2 } from './lib/Vec'

export class NPCState {
  pos: Vec2
  mode: number
  hasDialog: boolean

  constructor(s: InitialNPCState) {
    this.pos = s.pos || [0, 0]
    this.mode = s.mode || 0
    this.hasDialog = s.hasDialog === undefined ? false : s.hasDialog
  }
}

export type InitialNPCState = {
  pos?: Vec2
  mode?: number
  hasDialog?: boolean
}

export class NPC<State extends NPCState = NPCState> {
  private readonly anime: Anime
  private readonly headUpText: Anime
  state: State

  constructor(anime: Anime, headUpText: Anime, s: State) {
    this.anime = anime
    this.headUpText = headUpText
    this.state = s
  }

  tick() {
    this.anime.tick()
    this.headUpText.tick()
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vec2, scale: number) {
    this.anime.draw(
      ctx,
      [offset[0] + this.state.pos[0], offset[1] + this.state.pos[1] - 18],
      scale,
      0,
      this.state.mode,
    )
    if (this.state.hasDialog) {
      this.headUpText.draw(
        ctx,
        [offset[0] + this.state.pos[0], offset[1] + this.state.pos[1] - 20],
        scale,
        0,
        2,
      )
    }
  }
}
