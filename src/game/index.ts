import { Anime } from './Anime'
import { Splite } from './Splite'
import { Vec2 } from './Vec'
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
  readonly kernelAnime: {
    idle: Anime
    squat: Anime
    jump: Anime
  }
  readonly bg: Splite
  readonly gameMap: GameMap<SimpleCell>

  command: Map<string, boolean>
  kernelPos: Vec2
  kernelVel: Vec2
  kernelJumpPow: Vec2
  kernelOnGround: boolean
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

    this.kernelAnime = {
      idle: new Anime(this.ctx, this.splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [0, 0, 0, 2, 0, 1, 0],
      }),
      squat: new Anime(this.ctx, this.splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [3],
      }),
      jump: new Anime(this.ctx, this.splite, {
        topLeft: [0, 0],
        sz: [12, 12],
        frames: [2, 2, 0, 2, 2, 2, 0],
      }),
    }
    this.bg = new Splite(this.ctx, this.splite, {
      topLeft: [0, 512],
      sz: [16, 16],
    })

    const mapData1 = [
      [0, 1, 2, 3, 2, 1, 3, 2, 0, 4, 8, 5, 3, 2],
      [0, 1, 2, 3, 1, 1, 3, 2, 0, 6, 8, 5, 3, 2],
      [1, 0, 2, 3, 2, 9, 1, 2, 6, 8, 8, 5, 1, 0],
      [8, 8, 8, 8, 8, 7, 1, 2, 6, 8, 8, 8, 8, 8],
    ]
    const mapData2 = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [3, 3, 3, 3, 3, 2, 2, 2, 2, 0, 0, 3, 3, 3],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0],
    ]
    this.gameMap = new GameMap<SimpleCell>(
      [14, 4],
      (x: number, y: number) => new SimpleCell(mapData1[y][x], mapData2[y][x]),
      [-100, 0],
      [100, 4],
      [640, 480],
    )

    this.kernelPos = [0, 0]
    this.kernelVel = [0, 0]
    this.kernelOnGround = true
    this.kernelJumpPow = [0, 0]
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

    if (this.command.has('ArrowLeft') && this.kernelOnGround) {
      this.kernelJumpPow[0]--
      if (this.kernelJumpPow[0] < -4) {
        this.kernelJumpPow[0] = -4
      }
      this.kernelDir = 0
    }
    if (this.command.has('ArrowRight') && this.kernelOnGround) {
      this.kernelJumpPow[0]++
      if (this.kernelJumpPow[0] > 4) {
        this.kernelJumpPow[0] = 4
      }
      this.kernelDir = 1
    }
    if (
      !this.command.has('ArrowLeft') &&
      !this.command.has('ArrowRight') &&
      !this.command.has('Space') &&
      this.kernelOnGround &&
      this.kernelJumpPow[0] !== 0 &&
      this.kernelJumpPow[1] === 0
    ) {
      this.kernelOnGround = false
      this.kernelVel = [this.kernelJumpPow[0], 2]
      this.kernelJumpPow = [0, 0]
    }

    this.kernelPos[0] += this.kernelVel[0]
    this.kernelPos[1] += this.kernelVel[1]

    let kernel = this.kernelAnime.idle
    if (this.command.has('Space') && this.kernelOnGround) {
      kernel = this.kernelAnime.squat
      this.kernelJumpPow[1] += 2
      if (this.kernelJumpPow[1] > 10) {
        this.kernelJumpPow[1] = 10
      }
    } else {
      if (!this.command.has('Space') && this.kernelJumpPow[1] > 0) {
        this.kernelOnGround = false
        this.kernelVel = this.kernelJumpPow
        this.kernelJumpPow = [0, 0]
      }
      if (!this.kernelOnGround) {
        this.kernelVel[1] -= 2
        if (this.kernelVel[1] < -15) {
          this.kernelVel[1] = -15
        }
        if (this.kernelPos[1] + this.kernelVel[1] < 0) {
          this.kernelPos[1] = 0
          this.kernelVel = [0, 0]
          this.kernelOnGround = true
          kernel = this.kernelAnime.squat
        }
        if (this.kernelVel[1] > 0) {
          kernel = this.kernelAnime.jump
        } else if (this.kernelVel[1] < 0) {
          kernel = this.kernelAnime.squat
        }
      }
    }

    try {
      this.gameMap.draw(this.bg, [-this.kernelPos[0] / 3, 97], 3)
      kernel.tick()
      kernel.draw(
        [this.kernelPos[0] + 100, -this.kernelPos[1] + 92],
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
