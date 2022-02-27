import GameMap from './lib/GameMap'
import { Vec2 } from './lib/vec'

import MapCell from './MapCell'
import { EventHandler } from './events'

import mapData from './data/map.yaml'

type Props = {
  getItem: EventHandler<MapCell>
}

type GameMetaData = {
  init: {
    kernel: Vec2
  }
  spawn: { [name: string]: Vec2 }
}

type GameData = GameMetaData & {
  m: GameMap<MapCell>
}

export const importGameData = ({ getItem }: Props): GameData => {
  const mw = mapData.main[0].length
  const mh = mapData.main.length

  const meta = (mapData.meta as Array<Array<Array<string>>>).reduce(
    (out, row, j) =>
      row.reduce(
        (out, m, i) =>
          m.reduce((out, d) => {
            const n = d.split('.')
            switch (n[0]) {
              case 'init':
                out.init = { kernel: [i * 16, j * 16] }
                break
              case 'spawn':
                out.spawn[n[1]] = [i * 16, j * 16]
                break
            }
            return out
          }, out),
        out,
      ),
    {
      init: {
        kernel: [0, 0],
      },
      spawn: {},
    } as GameMetaData,
  )

  return {
    ...meta,
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
        const items = (mapData.meta[y][x] as string[]).reduce<number[]>(
          (acc, m) => {
            const [t, v] = m.split('.')
            if (t === 'item') {
              acc.push(parseInt(v))
            }
            return acc
          },
          [],
        )
        const c = new MapCell(
          {
            main: [mapData.main[y][x][0], mapData.main[y][x][1]],
            under: [mapData.under[y][x][0], mapData.under[y][x][1]],
            overlay: [mapData.overlay[y][x][0], mapData.overlay[y][x][1]],
            overlayAnime:
              items.length > 0
                ? [0, 2]
                : [
                    mapData.overlayAnime[y][x][0],
                    mapData.overlayAnime[y][x][1],
                  ],
          },
          t,
          col,
          mapData.meta[y][x],
        )
        if (items.length > 0) {
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

export const exportGameData = (g: GameData): Blob => {
  const paddedArray = (a: Array<Array<string>>): string => {
    const len = new Array<number>(g.m.sz[0])
    a.forEach((r) =>
      r.forEach((v, i) => {
        if (!len[i] || len[i] < v.length) {
          len[i] = v.length
        }
      }),
    )
    return a
      .reduce((out, r) => {
        out.push(
          `  - [ ${r
            .reduce<Array<string>>((acc, v, i) => {
              const pad = len[i] - v.length
              acc.push(`${' '.repeat(pad)}${v}`)
              return acc
            }, [])
            .join(', ')} ]`,
        )
        return out
      }, [])
      .join('\n')
  }
  const extractLayer = (layer: string) =>
    [...Array(g.m.sz[1])].map((_, j) =>
      [...Array(g.m.sz[0])].map((_, i) =>
        JSON.stringify(g.m.at([i, j]).appearance(layer)),
      ),
    )
  const extractMeta = () =>
    [...Array(g.m.sz[1])].map((_, j) =>
      [...Array(g.m.sz[0])].map((_, i) => JSON.stringify(g.m.at([i, j]).meta)),
    )
  const extractType = () =>
    [...Array(g.m.sz[1])].map((_, j) =>
      [...Array(g.m.sz[0])].map((_, i) => JSON.stringify(g.m.at([i, j]).typ)),
    )

  const data: { [key: string]: Array<Array<string>> } = {
    meta: extractMeta(),
    main: extractLayer('main'),
    type: extractType(),
    under: extractLayer('under'),
    overlay: extractLayer('overlay'),
    overlayAnime: extractLayer('overlayAnime'),
  }

  return new Blob(
    [
      Object.keys(data)
        .map((k) => `${k}:\n${paddedArray(data[k])}`)
        .join('\n') + '\n',
    ],
    {
      type: 'plain/text',
    },
  )
}

export default GameData
