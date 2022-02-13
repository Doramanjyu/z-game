import { Sprite } from './lib/Sprite'
import { Anime } from './lib/Anime'
import { GameMap } from './lib/GameMap'
import { Vec2 } from './lib/Vec'

import { Kernel } from './Kernel'
import { MapCell, OverlayMapCell } from './MapCell'

import mapData from './data/map.yaml'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly sprite: HTMLImageElement
  readonly messageBox: HTMLDivElement
  cleanup?: () => void

  readonly scale: number

  readonly gameMap: GameMap<MapCell>
  readonly overlayMap: GameMap<OverlayMapCell>
  readonly overlayAnimeMap: GameMap<OverlayMapCell>
  readonly bg: Sprite
  readonly bgOverlay: Sprite
  readonly bgOverlayAnime: Anime
  readonly kernel: Kernel

  command: Map<string, boolean>

  origin: Vec2
  viewpoint: Vec2

  constructor(
    canvas: HTMLCanvasElement,
    sprite: HTMLImageElement,
    messageBox: HTMLDivElement,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.canvas = canvas
    this.ctx.imageSmoothingEnabled = false
    this.sprite = sprite
    this.messageBox = messageBox

    this.scale = 3
    this.origin = [mapData.start.pos[0] * 16, mapData.start.pos[1] * 16]
    this.viewpoint = [0, 0]

    this.kernel = new Kernel(this.sprite, {
      pos: this.origin,
    })
    this.bg = new Sprite(this.sprite, {
      topLeft: [0, 512],
      sz: [16, 16],
    })
    this.bgOverlay = new Sprite(this.sprite, {
      topLeft: [0, 896],
      sz: [16, 16],
    })
    this.bgOverlayAnime = new Anime(this.sprite, {
      topLeft: [0, 768],
      sz: [16, 16],
      frames: [0, 0, 1, 1, 2, 2, 1, 1],
    })

    const mw = mapData.main[0].length
    const mh = mapData.main.length
    this.gameMap = new GameMap<MapCell>(
      [mw, mh],
      (x: number, y: number) =>
        new MapCell(
          mapData.main[y][x][1],
          mapData.main[y][x][0],
          mapData.type[y][x],
        ),
      [-100, 0],
      [100, mh],
      [640, 480],
    )
    this.overlayMap = new GameMap<OverlayMapCell>(
      [mw, mh],
      (x: number, y: number) =>
        new OverlayMapCell(mapData.overlay[y][x][1], mapData.overlay[y][x][0]),
      [-100, 0],
      [100, mh],
      [640, 480],
    )
    this.overlayAnimeMap = new GameMap<OverlayMapCell>(
      [mw, mh],
      (x: number, y: number) =>
        new OverlayMapCell(
          mapData.overlayAnime[y][x][1],
          mapData.overlayAnime[y][x][0],
        ),
      [-100, 0],
      [100, mh],
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
      if (state.pos[1] > 16 * 18) {
        this.kernel.reset()
      }

      const diffY = (state.pos[1] - this.origin[1]) / 1.25
      if (this.viewpoint[1] < diffY - 16) {
        this.viewpoint[1] += (diffY - 16 - this.viewpoint[1]) / 4
      }
      if (this.viewpoint[1] > diffY + 16) {
        this.viewpoint[1] += (diffY + 16 - this.viewpoint[1]) / 4
      }
      const diffX =
        (Math.round(((state.pos[0] - this.origin[0] - 6) * 3) / 640) * 640) / 3
      this.viewpoint[0] += Math.max(
        -50,
        Math.min(50, (diffX - this.viewpoint[0]) / 2),
      )

      const offset: Vec2 = [
        -this.viewpoint[0],
        110 - this.origin[1] - this.viewpoint[1],
      ]

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
