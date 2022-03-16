import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

import Game, { ItemUI } from '@doramanjyu/z-game/game'

import frame from '@doramanjyu/z-game/images/frame.svg'
import frameInner from '@doramanjyu/z-game/images/frame_inner.svg'
import sprite from '@doramanjyu/z-game/images/sprite.png'

import '@doramanjyu/z-game/css/message.css'

const IndexPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spriteRef = useRef<HTMLImageElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const itemUIRef = useRef<ItemUI>(null)

  useEffect(() => {
    if (
      !canvasRef.current ||
      !spriteRef.current ||
      !messageRef.current ||
      !itemUIRef.current
    ) {
      return
    }
    const g = new Game(
      canvasRef.current,
      spriteRef.current,
      messageRef.current,
      itemUIRef.current.updateItems,
    )
    g.start()
    const keydown = g.keydown.bind(g)
    const keyup = g.keyup.bind(g)
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)

    const noPreventDefault = (e: TouchEvent): boolean => {
      if (!e.target || !(e.target instanceof Element)) {
        return false
      }
      return e.target.closest('a,.usableItem') !== null
    }
    let [tx, ty] = [0, 0]
    let touching = false
    const touchMoveThreshold = 32
    const touchStart = (e: TouchEvent) => {
      if (noPreventDefault(e)) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (!touching) {
        tx = e.touches[0].screenX
        ty = e.touches[0].screenY
        touching = true
      }
    }
    const touchMove = (e: TouchEvent) => {
      if (noPreventDefault(e)) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (e.touches[0].screenY > ty + touchMoveThreshold) {
        keydown({ code: 'Space' })
      }
      if (e.touches[0].screenX > tx + touchMoveThreshold) {
        keydown({ code: 'ArrowLeft' })
        keyup({ code: 'ArrowRight' })
      } else if (e.touches[0].screenX < tx - touchMoveThreshold) {
        keydown({ code: 'ArrowRight' })
        keyup({ code: 'ArrowLeft' })
      } else {
        keyup({ code: 'ArrowRight' })
        keyup({ code: 'ArrowLeft' })
      }
    }
    const touchEnd = (e: TouchEvent) => {
      if (noPreventDefault(e)) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (e.touches.length === 0) {
        keyup({ code: 'Space' })
        keyup({ code: 'ArrowRight' })
        keyup({ code: 'ArrowLeft' })
        touching = false
      }
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchmove', touchMove)
    document.addEventListener('touchend', touchEnd)
    document.addEventListener('touchcancel', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchmove', touchMove)
      document.removeEventListener('touchend', touchEnd)
      document.removeEventListener('touchcancel', touchEnd)
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
      g.stop()
    }
  }, [canvasRef, spriteRef, messageRef])

  return (
    <main style={{ width: '788px', margin: '0 auto' }}>
      <title>What's poppin?</title>
      <h1 style={{ textAlign: 'center', margin: '3px' }}>UNDER DEVELOPMENT</h1>
      <div
        style={{
          width: '788px',
          height: '689px',
          backgroundImage: `url(${frame})`,
          position: 'relative',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: '#000',
            width: '640px',
            height: '480px',
            borderRadius: '30px',
            position: 'absolute',
            left: '74px',
            top: '188px',
          }}
          css={css`
            &:focus-visible {
              outline-style: none !important;
            }
          `}
          width="640"
          height="480"
        />
        <div
          style={{
            width: '640px',
            height: '480px',
            backgroundImage: `url(${frameInner})`,
            position: 'absolute',
            left: '74px',
            top: '188px',
          }}
        >
          <ItemUI
            ref={itemUIRef}
            sprite={sprite}
            scale={3}
            style={{
              position: 'absolute',
              top: '16px',
            }}
          />
          <div
            ref={messageRef}
            style={{
              boxSizing: 'border-box',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderWidth: '2px',
              borderStyle: 'dotted',
              borderRadius: '0 20px 20px 20px',
              borderColor: 'white',
              position: 'absolute',
              width: '540px',
              height: '85px',
              left: '50px',
              bottom: '30px',
              padding: '10px 20px',
              fontSize: '20px',
              lineHeight: '25px',
              color: '#600',
              display: 'none',
              animationIterationCount: 1,
              animationFillMode: 'forwards',
            }}
            css={css`
              animation: bounceIn 0.8s ease;
              &.hide {
                animation: bounceOut 0.5s ease;
              }
              span.messageLast:after {
                content: '▼';
                animation: cursorBlink 1s linear infinite;
              }
              span.message:after {
                content: '▶';
                animation: cursorBlink 1s linear infinite;
              }
            `}
          />
        </div>
      </div>
      <img
        ref={spriteRef}
        src={sprite}
        style={{
          display: 'none',
        }}
      />
      <div
        style={{
          paddingTop: '10px',
          textAlign: 'right',
          color: '#666',
        }}
        css={css`
          > a {
            color: #666;
          }
          > a:hover {
            color: #999;
          }
        `}
      >
        <a
          href="https://github.com/Doramanjyu/z-game"
          target="_blank"
          rel="noreferrer"
        >
          Source repository
        </a>
      </div>
    </main>
  )
}

export default IndexPage
