import { Anime } from "./anime"

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly splite: HTMLImageElement
  readonly timerId: number

  // temporary
  readonly kernelAnime: Anime

  command: Map<string, boolean>
  kernelX: number
  kernelY: number
  kernelDir: number
  // /temporary

  constructor(canvas: HTMLCanvasElement, splite: HTMLImageElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
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
    this.command = {}
  }

  start() {
    this.timerId = setInterval(this.tick.bind(this), 100)
    this.canvas.addEventListener('keydown', this.keydown.bind(this))
  }

  stop() {
    clearInterval(this.timerId)
  }

  tick() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, 640, 480)

    if ('ArrowLeft' in this.command) {
      this.kernelX -= 3
      this.kernelDir = 0
    }
    if ('ArrowRight' in this.command) {
      this.kernelX += 3
      this.kernelDir = 1
    }
    this.command = {}

    try {
      this.kernelAnime.tick()
      this.kernelAnime.draw(this.kernelX, this.kernelY, this.kernelDir)
    } catch(err) {
      console.error(err)
      this.stop()
    }
  }

  private keydown(e: KeyboardEvent) {
    console.log(e.code)
    this.command[e.code] = true
  }
}

export default Game
