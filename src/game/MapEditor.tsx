import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Draggable from 'react-draggable'
import { css } from '@emotion/react'

import GameMap from './lib/GameMap'
import { Vec2 } from './lib/vec'

import MapCell from './MapCell'
import { importGameData, exportGameData } from './GameData'

type Props = {
  sprite: string
}

const MapEditor: React.FC<Props> = ({ sprite }) => {
  const gameData = useMemo(
    () =>
      importGameData({
        getItem: () => {
          console.log('item event fired')
        },
      }),
    [],
  )
  const [clipboard, setClipboard] = useState<MapCell | null>()
  const [cursor, setCursor] = useState<Vec2>([0, 0])
  const [value, setValue] = useState<Vec2>([0, 0])
  const [cellType, setCellType] = useState(0)
  const [meta, setMeta] = useState('')
  const [scale, setScale] = useState(2)
  const [_, setVersion] = useState(0)
  const [layer, setLayer] = useState('main')

  const incrementVersion = () => setVersion((v) => v + 1)

  const updateValue = ({ diff, abs }: { diff?: Vec2; abs?: Vec2 }) => {
    const cell = gameData.m.at(cursor)
    if (diff) {
      cell.v[layer][0] += diff[0]
      cell.v[layer][1] += diff[1]
    } else if (abs) {
      cell.v[layer][0] = abs[0]
      cell.v[layer][1] = abs[1]
    }
    setValue(gameData.m.at(cursor).v[layer])
    incrementVersion()
  }
  const updateCellType = (v: number) => {
    const cell = gameData.m.at(cursor)
    cell.typ = v
    setCellType(v)
    incrementVersion()
  }
  const updateMeta = (v: string) => {
    const cell = gameData.m.at(cursor)
    cell.meta = v.split(' ')
    setMeta(v)
    incrementVersion()
  }
  const changeLayer = (l: string) => {
    setLayer(l)
    setValue(gameData.m.at(cursor).v[l])
  }
  const updateCursor = (p: Vec2) => {
    setCursor(p)
    setValue(gameData.m.at(p).v[layer])
    setCellType(gameData.m.at(p).typ)
    setMeta(gameData.m.at(p).meta.join(' '))
  }

  const onSave = () => {
    const b = exportGameData(gameData)
    const link = document.createElement('a')
    link.download = 'map.yaml'
    link.href = URL.createObjectURL(b)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resize = (offset: Vec2, sz: Vec2) => {
    const mPrev = gameData.m
    const szPrev = [...mPrev.sz]
    gameData.m = new GameMap<MapCell>(
      sz,
      (x: number, y: number) => {
        x -= offset[0]
        y -= offset[1]
        if (x < 0) {
          x = 0
        } else if (y < 0) {
          y = 0
        } else if (x >= szPrev[0]) {
          x = szPrev[0] - 1
        } else if (y >= szPrev[1]) {
          y = szPrev[1] - 1
        }
        return mPrev.at([x, y]).clone()
      },
      mPrev.s,
      [mPrev.e[0], sz[1]],
      mPrev.screenSize,
    )
    incrementVersion()
  }
  const onCommand: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!(e?.target instanceof HTMLSelectElement)) {
      return
    }
    switch (e.target.value) {
      case 'addRight':
        resize([0, 0], [gameData.m.sz[0] + 1, gameData.m.sz[1]])
        break
      case 'addLeft':
        resize([1, 0], [gameData.m.sz[0] + 1, gameData.m.sz[1]])
        break
      case 'addBottom':
        resize([0, 0], [gameData.m.sz[0], gameData.m.sz[1] + 1])
        break
      case 'addTop':
        resize([0, 1], [gameData.m.sz[0], gameData.m.sz[1] + 1])
        break
    }
  }

  const onKeydown = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyC':
        if (e.ctrlKey) {
          setClipboard(gameData.m.at(cursor))
        }
        break
      case 'KeyV':
        if (e.ctrlKey && clipboard) {
          gameData.m.set(cursor, clipboard.clone())
          incrementVersion()
        }
        break
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [onKeydown])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        fontSize: '14px',
        backgroundColor: '#111',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '2rem',
          backgroundColor: '#333',
          display: 'flex',
          padding: '4px 8px',
          boxSizing: 'border-box',
          alignItems: 'stretch',
          color: 'white',
        }}
        css={css`
          select,
          button,
          label {
            margin: 0 2px;
          }
          label {
            display: flex;
            align-items: center;
          }
        `}
      >
        <button onClick={onSave}>save as</button>
        <Divider />
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
        <label htmlFor="layerSelect">layer</label>
        <select
          id="layerSelect"
          onChange={(e) => changeLayer(e.target.value)}
          value={layer}
        >
          <option value="main">main</option>
          <option value="under">under</option>
          <option value="overlay">overlay</option>
          <option value="overlayAnime">overlay anime</option>
        </select>
        <Divider />
        <select value="command" onChange={onCommand}>
          <option value="command">command</option>
          <option value="addRight">→ add right</option>
          <option value="addLeft">← add left</option>
          <option value="addBottom">↓ add bottom</option>
          <option value="addTop">↑ add top</option>
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
            width: ${gameData.m.sz[0] * 16 * scale}px;
            height: ${16 * scale}px;
            white-space: nowrap;
            background-color: #224;
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
        {[...Array(gameData.m.sz[1])].map((_, j) => (
          <div key={`row${j}`} className="row">
            {[...Array(gameData.m.sz[0])].map((_, i) => {
              const cell = gameData.m.at([i, j])
              const meta = cell.meta
              const typ = cell.typ
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
                  {meta.length > 0 && (
                    <span
                      style={{
                        backgroundPosition: `-${992 * scale}px -${
                          16 * scale
                        }px`,
                      }}
                    />
                  )}
                  {typ > 0 && (
                    <span
                      style={{
                        backgroundPosition: `-${992 * scale}px -${
                          (2 + typ) * 16 * scale
                        }px`,
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
              opacity: 0.7;
              &:hover {
                opacity: 0.8;
              }
              div {
                display: flex;
                justify-content: center;
              }
              button,
              select,
              input {
                margin: 2px 0;
              }
              select,
              label {
                padding: 2px;
              }
              label {
                display: flex;
                align-items: center;
              }
              input.shortNum {
                width: 2em;
                text-align: center;
              }
              input[type='number']::-webkit-inner-spin-button,
              input[type='number']::-webkit-outer-spin-button {
                -webkit-appearance: none;
              }
              input[type='number'] {
                -moz-appearance: textfield;
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
                type="number"
              />
              <button onClick={() => updateValue({ diff: [1, 0] })}>
                &gt;
              </button>
              &nbsp;
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
                type="number"
              />
              <button onClick={() => updateValue({ diff: [0, 1] })}>
                &gt;
              </button>
            </div>
            <div>
              <label htmlFor="typeSelect">type</label>
              <select
                id="typeSelect"
                onChange={(e) => updateCellType(parseInt(e.target.value))}
                value={cellType}
              >
                <option value="0">none</option>
                <option value="1">occupied</option>
                <option value="2">heat</option>
                <option value="3">step</option>
              </select>
            </div>
            <div>
              <input
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={meta}
                onChange={(e) => updateMeta(e.target.value)}
              />
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

const Divider = () => (
  <span
    style={{
      height: '100%',
      width: '2px',
      margin: '0 8px',
      backgroundColor: '#666',
    }}
  />
)

export default MapEditor
