import { Sprite } from './lib/Sprite'
import { Anime } from './lib/Anime'
import { GameMap } from './lib/GameMap'
import { CollisionMap } from './lib/Collision'
import { Vec2 } from './lib/Vec'
import { StateMachine, State, nopState } from './lib/StateMachine'

import { Kernel } from './Kernel'
import { MapCell, OverlayMapCell } from './MapCell'
import { ZEA } from './ZEA'
import { EventHandler } from './events'
import { DialogManager } from './dialog'

import mapData from './data/map.yaml'

class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly sprite: HTMLImageElement
  cleanup?: () => void

  readonly scale: number

  readonly sm: StateMachine
  readonly dm: DialogManager

  readonly gameMap: GameMap<MapCell>
  readonly underMap: GameMap<OverlayMapCell>
  readonly overlayMap: GameMap<OverlayMapCell>
  readonly overlayAnimeMap: GameMap<OverlayMapCell>
  readonly ui: Sprite
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
  debugCursor: Vec2
  debugEditing?: Vec2

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

    this.scale = 3
    this.origin = [mapData.start.pos[0] * 16, mapData.start.pos[1] * 16]
    this.viewpoint = [0, 0]
    this.debugView = false
    this.debugCursor = [0, 0]

    this.kernel = new Kernel(this.sprite, {
      pos: this.origin,
    })
    this.ui = new Sprite(this.sprite, {
      topLeft: [992, 0],
      sz: [16, 16],
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

    const mw = mapData.main[0].length
    const mh = mapData.main.length
    this.gameMap = new GameMap<MapCell>(
      [mw, mh],
      (x: number, y: number) => {
        const t = mapData.type[y][x]
        const tr = x + 1 > mw - 1 ? mw - 1 : mapData.type[y][x + 1]
        const tl = x - 1 < 0 ? 0 : mapData.type[y][x - 1]
        const tt = y - 1 < 0 ? 0 : mapData.type[y - 1][x]
        const tb = y + 1 > mh - 1 ? mh - 1 : mapData.type[y + 1][x]
        const col = {
          top: t == 2 || t == 3 || (t == 1 && tt != 1),
          bottom: t == 1 && tb != 1,
          left: t == 1 && tl != 1,
          right: t == 1 && tr != 1,
        }
        const c = new MapCell(
          mapData.main[y][x][1],
          mapData.main[y][x][0],
          t,
          col,
        )
        if (mapData.item[y][x] > 0) {
          c.onAction.push(() => {
            c.onAction = []
            self.overlayAnimeMap.set([x, y], new OverlayMapCell(0, 0))
            self.dm.showMessage('Yum Yum', { timeout: 2000 })
          })
        }
        return c
      },
      [-100, 0],
      [100, mh],
      [640, 480],
    )
    this.collisionMap = new CollisionMap(this.gameMap, [16, 16])
    this.underMap = new GameMap<OverlayMapCell>(
      [mw, mh],
      (x: number, y: number) =>
        new OverlayMapCell(mapData.under[y][x][1], mapData.under[y][x][0]),
      [-100, 0],
      [100, mh],
      [640, 480],
      2,
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
      (x: number, y: number) => {
        if (mapData.item[y][x] > 0) {
          return new OverlayMapCell(2, 0)
        }
        return new OverlayMapCell(
          mapData.overlayAnime[y][x][1],
          mapData.overlayAnime[y][x][0],
        )
      },
      [-100, 0],
      [100, mh],
      [640, 480],
    )
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
      this.kernel.tick(kernelCmd, this.gameMap, this.collisionMap)
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
      this.underMap.draw(this.ctx, this.bgUnder, offset, this.scale)
      this.gameMap.draw(this.ctx, this.bg, offset, this.scale)
      this.zea.draw(this.ctx, offset, this.scale)

      this.kernel.draw(this.ctx, offset, this.scale)
      this.overlayMap.draw(this.ctx, this.bgOverlay, offset, this.scale)
      this.overlayAnimeMap.draw(
        this.ctx,
        this.bgOverlayAnime,
        offset,
        this.scale,
      )

      if (this.debugView) {
        this.collisionMap.draw(this.ctx, offset, this.scale)
        this.ui.draw(
          this.ctx,
          [
            this.debugCursor[0] * 16 + (offset[0] % 16),
            this.debugCursor[1] * 16 + (offset[1] % 16),
          ],
          this.scale,
          0,
          0,
        )
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
    if (this.debugEditing) {
      if (e.code === 'Enter') {
        const input = document.getElementById('cellValue') as HTMLInputElement
        const v = JSON.parse(input.value)
        this.gameMap.at(this.debugEditing).v.mode1 = v.mode1
        this.gameMap.at(this.debugEditing).v.mode2 = v.mode2
        this.debugEditing = undefined
        this.dm.hideMessage()
      }
      return
    }

    this.command.set(e.code, true)

    if (this.debugView) {
      switch (e.code) {
        case 'KeyW':
          this.debugCursor[1]--
          if (this.debugCursor[1] < 0) {
            this.debugCursor[1] = 0
          }
          break
        case 'KeyS':
          this.debugCursor[1]++
          if (this.debugCursor[1] > 10) {
            this.debugCursor[1] = 10
          }
          break
        case 'KeyA':
          this.debugCursor[0]--
          if (this.debugCursor[0] < 0) {
            this.debugCursor[0] = 0
          }
          break
        case 'KeyD':
          this.debugCursor[0]++
          if (this.debugCursor[0] > 13) {
            this.debugCursor[0] = 13
          }
          break
        case 'Enter': {
          this.dm.showMessage(`<input id="cellValue" style="width: 100%"/>`)
          const input = document.getElementById('cellValue') as HTMLInputElement
          if (!input) {
            break
          }
          const offset = this.offset()
          const mp: Vec2 = [
            Math.floor((this.debugCursor[0] * 16 - offset[0]) / 16),
            Math.floor((this.debugCursor[1] * 16 - offset[1]) / 16),
          ]
          this.debugEditing = mp
          input.value = JSON.stringify(this.gameMap.at(mp).v)
          input.focus()
          break
        }
      }
    }
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
