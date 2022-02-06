import { Anime } from './anime'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  cleanup?: () => void

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
    const keydown = this.keydown.bind(this)
    const keyup = this.keyup.bind(this)
    this.canvas.addEventListener('keydown', keydown)
    this.canvas.addEventListener('keyup', keyup)
    this.canvas.focus()
    const timerId = setInterval(this.tick.bind(this), 100)
    this.cleanup = () => {
      clearInterval(timerId)
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
  private keyup(e: KeyboardEvent) {
    this.command.delete(e.code)
  }
}

export default Game
