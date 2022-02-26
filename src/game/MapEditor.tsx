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
  const [scale, setScale] = useState(2)
  const [_, setVersion] = useState(0)
  const [layer, setLayer] = useState('main')
  const updateValue = ({ diff, abs }: { diff?: Vec2; abs?: Vec2 }) => {
    const cell = gameMap.at(cursor)
    if (diff) {
      cell.v[layer][0] += diff[0]
      cell.v[layer][1] += diff[1]
    } else if (abs) {
      cell.v[layer][0] = abs[0]
      cell.v[layer][1] = abs[1]
    }
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
        fontSize: '14px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '2rem',
          backgroundColor: '#333',
          display: 'flex',
          padding: '4px 16px',
          boxSizing: 'border-box',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <label htmlFor="scale">scale</label>
        <select
          id="scale"
          defaultValue={2}
          onChange={(e) => setScale(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 2rem)',
          overflow: 'scroll',
        }}
        css={css`
          div.row {
            margin: 0;
            padding: 0;
            height: ${16 * scale}px;
            white-space: nowrap;
          }
          div.row > div {
            width: ${16 * scale}px;
            height: ${16 * scale}px;
            position: relative;
            left: 0;
            top: 0;
            display: inline-block;
          }
          div.row > div > span {
            display: block;
            background-image: url(${sprite});
            background-size: ${1024 * scale}px ${1024 * scale}px;
            image-rendering: pixelated;
            position: absolute;
            left: 0;
            top: 0;
            width: ${16 * scale}px;
            height: ${16 * scale}px;
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
                      backgroundPosition: `-${ux * 2 * scale}px -${
                        uy * 2 * scale
                      }px`,
                      backgroundSize: `${2048 * scale}px ${2048 * scale}px`,
                      width: `${32 * scale}px`,
                      height: `${32 * scale}px`,
                    }}
                  />
                  <span
                    style={{
                      backgroundPosition: `-${mx * scale}px -${my * scale}px`,
                    }}
                  />
                  <span
                    style={{
                      backgroundPosition: `-${ox * scale}px -${oy * scale}px`,
                    }}
                  />
                  <span
                    style={{
                      backgroundPosition: `-${oax * scale}px -${oay * scale}px`,
                    }}
                  />
                  {cursor[0] === i && cursor[1] === j && (
                    <span
                      style={{
                        backgroundPosition: `-${992 * scale}px 0`,
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}
        <Draggable handle="#editInput">
          <div
            id="editInput"
            style={{
              backgroundColor: 'white',
              width: '200px',
              height: 'auto',
              padding: '4px',
              color: 'black',
              borderRadius: '2px',
              borderTop: '1em solid #999',
              textAlign: 'center',
              position: 'fixed',
              bottom: '32px',
              right: '32px',
            }}
            css={css`
              opacity: 0.6;
              &:hover {
                opacity: 0.8;
              }
              button,
              select {
                margin: 2px 0;
              }
              input.shortNum {
                width: 3em;
                text-align: center;
              }
            `}
          >
            <div>
              <button onClick={() => updateValue({ diff: [-1, 0] })}>
                &lt;
              </button>
              <input
                value={value[0]}
                className="shortNum"
                onClick={(e) => (e.target as HTMLInputElement).select()}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  isNaN(v) || updateValue({ abs: [v, value[1]] })
                }}
              />
              <button onClick={() => updateValue({ diff: [1, 0] })}>
                &gt;
              </button>{' '}
              <button onClick={() => updateValue({ diff: [0, -1] })}>
                &lt;
              </button>
              <input
                value={value[1]}
                className="shortNum"
                onClick={(e) => (e.target as HTMLInputElement).select()}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  isNaN(v) || updateValue({ abs: [value[0], v] })
                }}
              />
              <button onClick={() => updateValue({ diff: [0, 1] })}>
                &gt;
              </button>
            </div>
            <label htmlFor="layerSelect">layer</label>
            <select
              id="layerSelect"
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
    </div>
  )
}

export default MapEditor
