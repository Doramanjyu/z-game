import { Splite } from './lib/Splite'
import { Anime } from './lib/Anime'
import { GameMap } from './lib/GameMap'
import { Vec2 } from './lib/Vec'

import { Kernel } from './Kernel'
import { MapCell, OverlayMapCell } from './MapCell'

import mapData from './data/map.yaml'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly messageBox: HTMLDivElement
  cleanup?: () => void

  readonly scale: number

  readonly gameMap: GameMap<MapCell>
  readonly overlayMap: GameMap<OverlayMapCell>
  readonly overlayAnimeMap: GameMap<OverlayMapCell>
  readonly bg: Splite
  readonly bgOverlay: Splite
  readonly bgOverlayAnime: Anime
  readonly kernel: Kernel

  command: Map<string, boolean>

  origin: Vec2

  constructor(
    canvas: HTMLCanvasElement,
    splite: HTMLImageElement,
    messageBox: HTMLDivElement,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.canvas = canvas
    this.ctx.imageSmoothingEnabled = false
    this.splite = splite
    this.messageBox = messageBox

    this.scale = 3
    this.origin = [mapData.start.pos[0] * 16, mapData.start.pos[1] * 16]
    this.kernel = new Kernel(this.splite, {
      pos: this.origin,
    })
    this.bg = new Splite(this.splite, {
      topLeft: [0, 512],
      sz: [16, 16],
    })
    this.bgOverlay = new Splite(this.splite, {
      topLeft: [0, 896],
      sz: [16, 16],
    })
    this.bgOverlayAnime = new Anime(this.splite, {
      topLeft: [0, 768],
      sz: [16, 16],
      frames: [0, 0, 1, 1, 2, 2, 1, 1],
    })

    this.gameMap = new GameMap<MapCell>(
      [14, 12],
      (x: number, y: number) =>
        new MapCell(
          mapData.main[y][x][1],
          mapData.main[y][x][0],
          mapData.type[y][x],
        ),
      [-100, 0],
      [100, 12],
      [640, 480],
    )
    this.overlayMap = new GameMap<OverlayMapCell>(
      [14, 11],
      (x: number, y: number) =>
        new OverlayMapCell(mapData.overlay[y][x][1], mapData.overlay[y][x][0]),
      [-100, 0],
      [100, 12],
      [640, 480],
    )
    this.overlayAnimeMap = new GameMap<OverlayMapCell>(
      [14, 11],
      (x: number, y: number) =>
        new OverlayMapCell(
          mapData.overlayAnime[y][x][1],
          mapData.overlayAnime[y][x][0],
        ),
      [-100, 0],
      [100, 12],
      [640, 480],
    )
    this.command = new Map<string, boolean>()
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 80)

    let showMessage = false
    const messageTest = () => {
      if (showMessage) {
        this.showMessage("What's poppin?")
      } else {
        this.hideMessage()
      }
      showMessage = !showMessage
    }
    const messageTimer = setInterval(messageTest, 5000)

    this.cleanup = () => {
      clearInterval(tickTimer)
      clearInterval(messageTimer)
    }
  }

  stop() {
    if (this.cleanup) {
      this.cleanup()
    }
  }

  tick() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, 640, 480)

    try {
      const kernelCmd = {
        left: this.command.has('ArrowLeft'),
        right: this.command.has('ArrowRight'),
        space: this.command.has('Space'),
      }
      this.kernel.tick(kernelCmd, this.gameMap)
      this.bgOverlayAnime.tick()

      const state = this.kernel.state
      if (state.pos[1] > 16 * 14) {
        this.kernel.reset()
      }

      const offset: Vec2 = [0, (this.origin[1] - state.pos[1]) / 3]

      this.gameMap.draw(this.ctx, this.bg, offset, this.scale)
      this.kernel.draw(this.ctx, offset, this.scale)
      this.overlayMap.draw(this.ctx, this.bgOverlay, offset, this.scale)
      this.overlayAnimeMap.draw(
        this.ctx,
        this.bgOverlayAnime,
        offset,
        this.scale,
      )
    } catch (err) {
      console.error(err)
      this.stop()
    }
  }

  keydown(e: Pick<KeyboardEvent, 'code'>) {
    this.command.set(e.code, true)
  }
  keyup(e: Pick<KeyboardEvent, 'code'>) {
    this.command.delete(e.code)
  }

  private showMessage(text: string) {
    this.messageBox.innerText = text
    this.messageBox.style.display = 'block'
    this.messageBox.classList.remove('hide')
  }
  private hideMessage() {
    this.messageBox.classList.add('hide')
  }
}

export default Game
