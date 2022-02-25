import React from 'react'
import { css } from '@emotion/react'

import mapData from './data/map.yaml'

type Props = {
  sprite: string
}

const MapEditor: React.FC<Props> = ({ sprite }) => {
  const main = mapData.main as number[][][]
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
          position: absolute;
          left: 0;
          top: 0;
          width: 16px;
          height: 16px;
        }
      `}
    >
      {main.map((row, j) => (
        <div key={`row${j}`}>
          {row.map((cell, i) => {
            const under = mapData.under[j][i]
            const overlay = mapData.overlay[j][i]
            const overlayAnime = mapData.overlayAnime[j][i]
            const [mx, my] = [cell[1] * 16, 512 + cell[0] * 16]
            const [ux, uy] = [512 + under[1] * 16, 512 + under[0] * 16]
            const [ox, oy] = [overlay[1] * 16, 896 + overlay[0] * 16]
            const [oax, oay] = [
              overlayAnime[1] * 16,
              768 + overlayAnime[0] * 16,
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
