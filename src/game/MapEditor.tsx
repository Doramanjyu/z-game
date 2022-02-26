import React, { useMemo } from 'react'
import { css } from '@emotion/react'

import { loadMap } from './map'

import mapData from './data/map.yaml'

type Props = {
  sprite: string
}

const MapEditor: React.FC<Props> = ({ sprite }) => {
  const gameMap = useMemo(
    () =>
      loadMap({
        getItem: () => {
          console.log('item event fired')
        },
      }),
    [mapData],
  )
  console.log(gameMap.sz)
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'scroll',
      }}
      css={css`
        div {
          margin: 0;
          padding: 0;
          height: 16px;
          white-space: nowrap;
        }
        div > div {
          width: 16px;
          height: 16px;
          position: relative;
          left: 0;
          top: 0;
          display: inline-block;
        }
        div > div > span {
          display: block;
          background-image: url(${sprite});
          image-rendering: pixelated;
          position: absolute;
          left: 0;
          top: 0;
          width: 16px;
          height: 16px;
        }
      `}
    >
      {[...Array(gameMap.sz[1])].map((_, j) => (
        <div key={`row${j}`}>
          {[...Array(gameMap.sz[0])].map((_, i) => {
            const cell = gameMap.at([i, j])
            const main = cell.appearance('main')
            const under = cell.appearance('under')
            const overlay = cell.appearance('overlay')
            const overlayAnime = cell.appearance('overlayAnime')
            const [mx, my] = [main[0] * 16, 512 + main[1] * 16]
            const [ux, uy] = [512 + under[0] * 16, 512 + under[1] * 16]
            const [ox, oy] = [overlay[0] * 16, 896 + overlay[1] * 16]
            const [oax, oay] = [
              overlayAnime[0] * 16,
              768 + overlayAnime[1] * 16,
            ]
            return (
              <div key={`col${i}`}>
                <span
                  style={{
                    backgroundPosition: `-${ux * 2}px -${uy * 2}px`,
                    backgroundSize: `2048px 2048px`,
                    width: '32px',
                    height: '32px',
                  }}
                />
                <span
                  style={{
                    backgroundPosition: `-${mx}px -${my}px`,
                  }}
                />
                <span
                  style={{
                    backgroundPosition: `-${ox}px -${oy}px`,
                  }}
                />
                <span
                  style={{
                    backgroundPosition: `-${oax}px -${oay}px`,
                  }}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default MapEditor
