import { Anime } from './anime'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  timerId?: ReturnType<typeof setInterval>

  // temporary
  readonly kernelAnime: Anime

  command: Map<string, boolean>
  kernelX: number
  kernelY: number
  kernelDir: number
  // /temporary

  constructor(canvas: HTMLCanvasElement, splite: HTMLImageElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.canvas = canvas
    this.ctx.imageSmoothingEnabled = false
    this.splite = splite

    this.kernelAnime = new Anime(this.ctx, this.splite, {
      sx: 0,
      sy: 0,
      w: 12,
      h: 12,
      frames: [0, 0, 0, 2, 0, 1, 0],
    })

    this.kernelX = 100
    this.kernelY = 100
    this.kernelDir = 0
    this.command = new Map<string, boolean>()
  }

  start() {
    this.timerId = setInterval(this.tick.bind(this), 100)
    this.canvas.addEventListener('keydown', this.keydown.bind(this))
    this.canvas.focus()
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId)
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
    this.command = new Map<string, boolean>()

    try {
      this.kernelAnime.tick()
      this.kernelAnime.draw(this.kernelX, this.kernelY, this.kernelDir)
    } catch (err) {
      console.error(err)
      this.stop()
    }
  }

  private keydown(e: KeyboardEvent) {
    this.command.set(e.code, true)
  }
}

export default Game
