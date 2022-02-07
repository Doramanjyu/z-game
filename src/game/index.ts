import { Anime } from './Anime'
import { Splite } from './Splite'
import { GameMap, Cell, Appearance } from './GameMap'

class SimpleCell implements Cell {
  readonly v: Appearance

  constructor(mode1: number, mode2: number) {
    this.v = {
      mode1,
      mode2,
    }
  }

  appearance(): Appearance {
    return this.v
  }
}

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly messageBox: HTMLDivElement
  cleanup?: () => void

  // temporary
  readonly kernelAnime: Anime
  readonly bg: Splite
  readonly gameMap: GameMap<SimpleCell>

  command: Map<string, boolean>
  kernelX: number
  kernelY: number
  kernelDir: number
  // /temporary

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

    this.kernelAnime = new Anime(this.ctx, this.splite, {
      sx: 0,
      sy: 0,
      w: 12,
      h: 12,
      frames: [0, 0, 0, 2, 0, 1, 0],
    })
    this.bg = new Splite(this.ctx, this.splite, {
      sx: 0,
      sy: 977,
      w: 16,
      h: 16,
    })

    const mapData = [
      [0, 1, 2, 3, 2, 1, 3, 2, 0, 4, 6, 5, 3, 2],
      [1, 0, 2, 0, 3, 0, 1, 2, 3, 4, 6, 5, 1, 0],
      [2, 0, 1, 0, 1, 0, 2, 2, 3, 4, 6, 5, 0, 1],
    ]
    this.gameMap = new GameMap<SimpleCell>(
      14,
      3,
      (x: number, y: number) => new SimpleCell(mapData[y][x], y),
    )

    this.kernelX = 0
    this.kernelY = 9
    this.kernelDir = 0
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

    if (this.command.has('ArrowLeft')) {
      this.kernelX -= 3
      this.kernelDir = 0
    }
    if (this.command.has('ArrowRight')) {
      this.kernelX += 3
      this.kernelDir = 1
    }

    try {
      this.gameMap.draw(
        this.bg,
        -100,
        0,
        100,
        3,
        -this.kernelX / 3,
        113,
        640,
        480,
        3,
      )
      this.kernelAnime.tick()
      this.kernelAnime.draw(
        this.kernelX + 100,
        this.kernelY + 100,
        3,
        this.kernelDir,
        0,
      )
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
