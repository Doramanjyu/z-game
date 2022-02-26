import React, { useMemo, useState } from 'react'
import Draggable from 'react-draggable'
import { css } from '@emotion/react'

import { Vec2 } from './lib/Vec'

import { loadMap } from './map'

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
    [],
  )
  const [cursor, setCursor] = useState<Vec2>([0, 0])
  const [value, setValue] = useState<Vec2>([0, 0])
  const [_, setVersion] = useState(0)
  const [layer, setLayer] = useState('main')
  const updateValue = (d: Vec2) => {
    const cell = gameMap.at(cursor)
    cell.v[layer][0] += d[0]
    cell.v[layer][1] += d[1]
    setValue(gameMap.at(cursor).v[layer])
    setVersion((v) => v + 1)
  }
  const changeLayer = (l: string) => {
    setLayer(l)
    setValue(gameMap.at(cursor).v[l])
  }
  const updateCursor = (p: Vec2) => {
    setCursor(p)
    setValue(gameMap.at(p).v[layer])
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'scroll',
      }}
      css={css`
        div.row {
          margin: 0;
          padding: 0;
          height: 16px;
          white-space: nowrap;
        }
        div.row > div {
          width: 16px;
          height: 16px;
          position: relative;
          left: 0;
          top: 0;
          display: inline-block;
        }
        div.row > div > span {
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
        <div key={`row${j}`} className="row">
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
              <div key={`col${i}`} onClick={() => updateCursor([i, j])}>
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
                {cursor[0] === i && cursor[1] === j && (
                  <span
                    style={{
                      backgroundPosition: `-992px 0`,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
      <Draggable>
        <div
          style={{
            backgroundColor: 'white',
            opacity: 0.7,
            width: '196px',
            height: 'auto',
            padding: '4px',
            fontSize: '10px',
            color: 'black',
            borderRadius: '2px',
            borderTop: '10px solid #999',
            textAlign: 'center',
            position: 'fixed',
            bottom: '16px',
            right: '16px',
          }}
          css={css`
            button,
            select {
              font-size: 10px;
              margin: 1px 0;
              font-family: inherit;
            }
          `}
        >
          <div>
            <button onClick={() => updateValue([-1, 0])}>&lt;</button>{' '}
            {value[0]} <button onClick={() => updateValue([1, 0])}>&gt;</button>{' '}
            <button onClick={() => updateValue([0, -1])}>&lt;</button>{' '}
            {value[1]} <button onClick={() => updateValue([0, 1])}>&gt;</button>
          </div>
          <label htmlFor="layerSelect">layer</label>
          <select
            onChange={(e) => changeLayer(e.target.value)}
            defaultValue="main"
          >
            <option value="main">main</option>
            <option value="under">under</option>
            <option value="overlay">overlay</option>
            <option value="overlayAnime">overlay anime</option>
          </select>
        </div>
      </Draggable>
    </div>
  )
}

export default MapEditor
