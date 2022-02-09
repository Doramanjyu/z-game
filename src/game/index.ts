import { Splite } from './lib/Splite'
import { GameMap } from './lib/GameMap'

import { Kernel } from './Kernel'
import { MapCell } from './MapCell'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly messageBox: HTMLDivElement
  cleanup?: () => void

  readonly scale: number

  readonly gameMap: GameMap<MapCell>
  readonly bg: Splite
  readonly kernel: Kernel

  command: Map<string, boolean>

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
    this.kernel = new Kernel(this.splite)
    this.bg = new Splite(this.splite, {
      topLeft: [0, 512],
      sz: [16, 16],
    })

    const mapData1 = [
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 7, 1, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 7, 2, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [0, 1, 2, 3, 2, 1, 3, 2, 0, 4, 8, 5, 3, 2],
      [0, 1, 2, 3, 1, 1, 3, 2, 0, 6, 8, 5, 3, 2],
      [1, 0, 2, 3, 2, 9, 1, 2, 6, 8, 8, 5, 1, 0],
      [8, 8, 8, 8, 8, 7, 1, 2, 6, 8, 8, 8, 8, 8],
    ]
    const mapData2 = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [3, 3, 3, 3, 3, 2, 2, 2, 2, 0, 0, 3, 3, 3],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0],
    ]
    const mapDataType = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    ]
    this.gameMap = new GameMap<MapCell>(
      [14, 7],
      (x: number, y: number) =>
        new MapCell(mapData1[y][x], mapData2[y][x], mapDataType[y][x] === 1),
      [-100, 0],
      [100, 7],
      [640, 480],
    )
    this.command = new Map<string, boolean>()
  }

  start() {
    const keydown = this.keydown.bind(this)
    const keyup = this.keyup.bind(this)
    this.canvas.addEventListener('keydown', keydown)
    this.canvas.addEventListener('keyup', keyup)
    this.canvas.focus()
    const tickTimer = setInterval(this.tick.bind(this), 100)

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
      this.canvas.removeEventListener('keydown', this.keydown.bind(this))
      this.canvas.removeEventListener('keyup', this.keyup.bind(this))
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

      this.gameMap.draw(this.ctx, this.bg, [0, 49], this.scale)
      this.kernel.draw(this.ctx, this.scale)
    } catch (err) {
      console.error(err)
      this.stop()
    }
  }

  private keydown(e: KeyboardEvent) {
    this.command.set(e.code, true)
  }
  private keyup(e: KeyboardEvent) {
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
