import Sprite from './lib/Sprite'
import Anime from './lib/Anime'
import CollisionMap from './lib/CollisionMap'
import { Vec2 } from './lib/vec'
import StateMachine from './lib/StateMachine'

import Kernel from './Kernel'
import ZEA from './ZEA'
import Nggis from './Nggis'
import DialogManager from './DialogManager'
import GameData, { importGameData } from './GameData'
import { CellType } from './MapCell'
import { ItemUpdater } from './item'
import { GameEventContext } from './context'
import { newDialogState } from './dialogState'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly sprite: HTMLImageElement
  cleanup?: () => void

  readonly scale: number

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
  readonly nggis: Nggis

  command: Map<string, boolean>

  origin: Vec2
  viewpoint: Vec2
  debugView: boolean

  constructor(
    canvas: HTMLCanvasElement,
    sprite: HTMLImageElement,
    messageBox: HTMLDivElement,
    updateItems: (updater: ItemUpdater) => void,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.canvas = canvas
    this.ctx.imageSmoothingEnabled = false
    this.sprite = sprite

    updateItems(() => [])
    this.dm = new DialogManager(messageBox)

    let effectItem: (id: number) => void = () => {
      console.error('item effect not ready')
    }
    const eventCtx: GameEventContext = {
      updateItems,
      dialogManager: this.dm,
      effectItem: (id: number) => {
        effectItem && effectItem(id)
      },
    }

    this.game = importGameData(eventCtx)

    this.scale = 3
    this.origin = this.game.init.kernel
    this.viewpoint = [0, 0]
    this.debugView = false

    this.kernel = new Kernel(eventCtx, this.sprite, {
      pos: this.origin,
    })
    effectItem = this.kernel.effectItem

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

    this.zea = new ZEA(eventCtx, this.sprite, {
      pos: this.game.spawn.ZEA,
      mode: 1,
    })
    const zTalk = newDialogState(this.dm, this.zea, ['Hemlo', '...'], 0)
    const smZ = new StateMachine(zTalk)
    this.zea.onAction.push(smZ.handler(zTalk))

    this.nggis = new Nggis(eventCtx, this.sprite, {
      pos: this.game.spawn.Nggis,
      mode: 0,
    })
    const nggisTalk = newDialogState(this.dm, this.nggis, ['Halo'], 1)
    const smNggis = new StateMachine(nggisTalk)
    this.nggis.onAction.push(smNggis.handler(nggisTalk))

    this.kernel.onInteract = () => {
      this.zea.interact()
      this.nggis.interact()
    }

    this.collisionMap = new CollisionMap(this.game.m, [16, 16])
    this.command = new Map<string, boolean>()
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 80)

    this.dm.showMessage("What's poppin?")

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

      if (this.game.m.at(this.kernel.mapPos()).typ === CellType.GameOver) {
        this.kernel.reset()
      }

      const state = this.kernel.state
      this.zea.tick(state.pos)
      this.nggis.tick(state.pos)

      const viewControl = (
        vp: number,
        diff: number,
        tolerance: number,
        gain: number,
      ) => {
        if (vp < diff - tolerance) {
          vp += (diff - tolerance - vp) * gain
        }
        if (vp > diff + tolerance) {
          vp += (diff + tolerance - vp) * gain
        }
        return Math.floor(vp)
      }
      this.viewpoint = [
        viewControl(this.viewpoint[0], state.pos[0] - this.origin[0], 24, 0.25),
        viewControl(
          this.viewpoint[1],
          (state.pos[1] - this.origin[1]) / 1.25,
          16,
          0.3,
        ),
      ]

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
      this.nggis.draw(this.ctx, offset, this.scale)

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
    return [-this.viewpoint[0] - 28, 110 - this.origin[1] - this.viewpoint[1]]
  }

  keydown(e: Pick<KeyboardEvent, 'code'>) {
    if (this.dm.open) {
      return
    }
    this.command.set(e.code, true)
  }

  keyup(e: Pick<KeyboardEvent, 'code'>) {
    if (this.command.has('F2')) {
      this.debugView = !this.debugView
    }
    if (this.dm.open) {
      this.dm.keyup(e)
      return
    }
    this.command.delete(e.code)
  }
}

export default Game
