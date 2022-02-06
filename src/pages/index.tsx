import React, { useEffect, useRef } from 'react'

import Game from '@doramanjyu/z-game/game'

import frame from '@doramanjyu/z-game/images/frame.svg'
import splite from '@doramanjyu/z-game/images/splite.png'

const IndexPage = () => {
  const canvasRef = useRef(null)
  const spliteRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && spliteRef.current) {
      const g = new Game(canvasRef.current, spliteRef.current)
      g.start()
      return () => g.stop()
    }
  }, [canvasRef, spliteRef])

  return (
    <main>
      <title>Home Page</title>
      <h1
        style={{
          overflow: 'show',
          height: 0,
        }}
      >
        What's poppin?
      </h1>
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
            borderRadius: '60px',
            position: 'absolute',
            left: '84px',
            top: '188px',
          }}
          width="640"
          height="480"
        />
      </div>
      <img
        ref={spliteRef}
        src={splite}
        style={{
          display: 'none',
        }}
      />
    </main>
  )
}

export default IndexPage
/*

 */
