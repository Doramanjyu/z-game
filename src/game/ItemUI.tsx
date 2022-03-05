import React from 'react'
import { css } from '@emotion/react'

import { Item, ItemUpdater } from './item'

type Props = {
  sprite: string
  scale: number
  style: React.CSSProperties
}

class ItemUI extends React.Component<Props> {
  readonly updateItems: (updater: ItemUpdater) => void
  items: Item[]

  constructor(props: Props) {
    super(props)
    this.items = []

    const self = this

    this.updateItems = (updater: ItemUpdater) => {
      self.items = updater(self.items)
      self.forceUpdate()
    }
  }

  render() {
    const { sprite, scale, style } = this.props
    return (
      <div
        style={{
          ...style,
          width: '100%',
          padding: '16px 64px',
          display: 'flex',
        }}
        css={css`
          > div {
            width: ${12 * scale}px;
            height: ${12 * scale}px;
            border: ${scale}px solid #666;
            background-color: rgba(64, 64, 64, 0.5);
            background-image: url(${sprite});
            background-size: ${1024 * scale}px ${1024 * scale}px;
            image-rendering: pixelated;
            margin: ${scale / 2}px;
            opacity: 0.5;
            position: relative;
          }
          > div.usableItem {
            opacity: 1;
          }
          > div.usableItem:hover {
            border: ${scale}px solid #ccc;
            cursor: pointer;
          }
          > div > span {
            visibility: hidden;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            text-align: center;
            padding: 4px;
            color: white;
            position: absolute;
            width: 100px;
            top: 120%;
            left: 50%;
            margin-left: -50px;
          }
          > div:hover > span {
            visibility: visible;
          }
        `}
      >
        {this.items.map((item) => {
          const clses = [] as string[]
          item.onUse && clses.push('usableItem')
          return (
            <div
              key={item.id}
              onClick={() => item.onUse && item.onUse()}
              className={clses.join(' ')}
              style={{
                backgroundPosition: `-${(512 + item.id * 12) * scale}px 0`,
              }}
            >
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ItemUI
