import GameMap from './lib/GameMap'
import { Vec2 } from './lib/vec'

import MapCell from './MapCell'
import { EventHandler } from './events'

import mapData from './data/map.yaml'

type Props = {
  getItem: EventHandler<MapCell>
}

type GameData = {
  m: GameMap<MapCell>
  init: {
    kernel: Vec2
  }
}

export const loadGameData = ({ getItem }: Props): GameData => {
  const mw = mapData.main[0].length
  const mh = mapData.main.length
  return {
    init: {
      kernel: [mapData.start.pos[0] * 16, mapData.start.pos[1] * 16],
    },
    m: new GameMap<MapCell>(
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
          {
            main: [mapData.main[y][x][1], mapData.main[y][x][0]],
            under: [mapData.under[y][x][1], mapData.under[y][x][0]],
            overlay: [mapData.overlay[y][x][1], mapData.overlay[y][x][0]],
            overlayAnime:
              mapData.item[y][x] > 0
                ? [0, 2]
                : [
                    mapData.overlayAnime[y][x][1],
                    mapData.overlayAnime[y][x][0],
                  ],
          },
          t,
          col,
        )
        if (mapData.item[y][x] > 0) {
          c.onAction.push((e) => {
            c.onAction = []
            e.target.v['overlayAnime'] = [0, 0]
            getItem(e)
          })
        }
        return c
      },
      [-100, 0],
      [100, mh],
      [640, 480],
    ),
  }
}

export default GameData
