import Sprite from './lib/Sprite'
import Anime from './lib/Anime'
import CollisionMap from './lib/CollisionMap'
import { Vec2 } from './lib/vec'
import StateMachine, { State, nopState } from './lib/StateMachine'

import Kernel from './Kernel'
import ZEA from './ZEA'
import { EventHandler } from './events'
import DialogManager from './DialogManager'
import GameData, { loadGameData } from './GameData'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly sprite: HTMLImageElement
  cleanup?: () => void

  readonly scale: number

  readonly sm: StateMachine
  readonly dm: DialogManager

  readonly game: GameData
  readonly bgUnder: Sprite
  readonly bg: Sprite
  readonly bgOverlay: Sprite
  readonly bgOverlayAnime: Anime
  readonly bgGrad: Sprite
  readonly kernel: Kernel
  readonly collisionMap: CollisionMap
  readonly zea: ZEA

  command: Map<string, boolean>

  origin: Vec2
  viewpoint: Vec2
  debugView: boolean

  constructor(
    canvas: HTMLCanvasElement,
    sprite: HTMLImageElement,
    messageBox: HTMLDivElement,
  ) {
    const self = this
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.canvas = canvas
    this.ctx.imageSmoothingEnabled = false
    this.sprite = sprite

    this.dm = new DialogManager(messageBox)
    this.game = loadGameData({
      getItem: () => {
        self.dm.showMessage('Yum Yum', { timeout: 2000 })
      },
    })

    this.scale = 3
    this.origin = this.game.init.kernel
    this.viewpoint = [0, 0]
    this.debugView = false

    this.kernel = new Kernel(this.sprite, {
      pos: this.origin,
    })
    this.bgUnder = new Sprite(this.sprite, {
      topLeft: [512, 512],
      sz: [16, 16],
      baseScale: 2,
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
    this.bgGrad = new Sprite(this.sprite, {
      topLeft: [1024 - 16, 0],
      sz: [16, 1024],
    })
    this.zea = new ZEA(this.sprite, {
      pos: [70, 48],
      mode: 1,
    })
    const zDialogs = ['Hemlo', '...']
    let zTalkCnt = 0
    const [zTalk, zTalkHandler] = this.newEventState<ZEA>({
      nextStates: { next: nopState },
      tick: () => {
        self.dm.showMessage(zDialogs[zTalkCnt], { timeout: 2000 })
        zTalkCnt += 1
        return zTalkCnt < zDialogs.length ? null : 'next'
      },
      enter: () => {
        this.zea.hasDialog = true
      },
      leave: () => {
        this.zea.hasDialog = false
      },
    })
    this.zea.onAction.push(zTalkHandler)
    this.sm = new StateMachine(zTalk)

    this.kernel.onInteract = () => {
      this.zea.interact()
    }

    this.collisionMap = new CollisionMap(this.game.m, [16, 16])
    this.command = new Map<string, boolean>()
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 80)

    this.dm.showMessage("What's poppin?", { timeout: 5000 })

    this.cleanup = () => {
      clearInterval(tickTimer)
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
      this.kernel.tick(kernelCmd, this.game.m, this.collisionMap)
      this.bgOverlayAnime.tick()

      const state = this.kernel.state
      if (state.pos[1] > 16 * 18) {
        this.kernel.reset()
      }

      this.zea.tick(state.pos)

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

      const offset = this.offset()

      for (let x = 0; x < 640 / this.scale; x += 16) {
        this.bgGrad.draw(
          this.ctx,
          [x, -1024 + 480 / this.scale - this.viewpoint[1] / 3 + 12],
          this.scale,
          0,
          0,
        )
      }
      this.game.m.draw(this.ctx, this.bgUnder, offset, this.scale, 'under')
      this.game.m.draw(this.ctx, this.bg, offset, this.scale, 'main')
      this.zea.draw(this.ctx, offset, this.scale)

      this.kernel.draw(this.ctx, offset, this.scale)
      this.game.m.draw(this.ctx, this.bgOverlay, offset, this.scale, 'overlay')
      this.game.m.draw(
        this.ctx,
        this.bgOverlayAnime,
        offset,
        this.scale,
        'overlayAnime',
      )
      this.game.m.draw(
        this.ctx,
        this.bgOverlayAnime,
        offset,
        this.scale,
        'overlayAnime',
      )

      if (this.debugView) {
        this.collisionMap.draw(this.ctx, offset, this.scale)
      }
    } catch (err) {
      console.error(err)
      this.stop()
    }
  }

  private offset(): Vec2 {
    return [-this.viewpoint[0], 110 - this.origin[1] - this.viewpoint[1]]
  }

  keydown(e: Pick<KeyboardEvent, 'code'>) {
    this.command.set(e.code, true)
  }

  keyup(e: Pick<KeyboardEvent, 'code'>) {
    if (this.command.has('F2')) {
      this.debugView = !this.debugView
    }
    this.command.delete(e.code)
  }

  private newEventState<T>(state: State): [State, EventHandler<T>] {
    const h = () => {
      if (this.sm.current === state) {
        this.sm.tick()
      }
    }
    return [state, h]
  }
}

export default Game
