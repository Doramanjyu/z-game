import React, { useEffect, useRef } from 'react'
import { css, keyframes } from '@emotion/react'

import Game from '@doramanjyu/z-game/game'

import frame from '@doramanjyu/z-game/images/frame.svg'
import frameInner from '@doramanjyu/z-game/images/frame_inner.svg'
import splite from '@doramanjyu/z-game/images/splite.png'

const IndexPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spliteRef = useRef<HTMLImageElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !spliteRef.current || !messageRef.current) {
      return
    }
    const g = new Game(canvasRef.current, spliteRef.current, messageRef.current)
    g.start()
    const setFocus = () => {
      if (canvasRef.current) {
        canvasRef.current.focus()
      }
    }
    document.addEventListener('click', setFocus)
    return () => {
      document.removeEventListener('click', setFocus)
      g.stop()
    }
  }, [canvasRef, spliteRef, messageRef])

  return (
    <main>
      <title>What's poppin?</title>
      <div
        style={{
          width: '808px',
          height: '689px',
          backgroundImage: `url(${frame})`,
          position: 'relative',
        }}
      >
        <canvas
          ref={canvasRef}
          tabIndex={1}
          style={{
            backgroundColor: '#000',
            width: '640px',
            height: '480px',
            borderRadius: '30px',
            position: 'absolute',
            left: '84px',
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
            left: '84px',
            top: '188px',
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
            left: '134px',
            bottom: '34px',
            padding: '10px 20px',
            fontSize: '20px',
            lineHeight: '25px',
            color: '#600',
            display: 'none',
            animationIterationCount: 1,
            animationFillMode: 'forwards',
          }}
          css={css`
            animation: ${bounceIn} 0.8s ease;
            &.hide {
              animation: ${bounceOut} 0.5s ease;
            }
          `}
        ></div>
      </div>
      <img
        ref={spliteRef}
        src={splite}
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
        <a href="https://github.com/Doramanjyu/z-game">Source repository</a>
      </div>
    </main>
  )
}

const bounceIn = keyframes`
  from, 20%, 46%, 80%, to {
    transform: translate3d(0,0,0);
    visibility: visible;
  }
  40%, 42% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -8px, 0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
`

const bounceOut = keyframes`
  from, 50% {
    transform: translate3d(0,0,0);
  }
  20% {
    transform: translate3d(0,-2px,0);
  }
  70% {
    transform: translate3d(0,-5px,0);
  }
  to {
    visibility: hidden;
  }
`

export default IndexPage
