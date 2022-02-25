import React from 'react'

import MapEditor from '@doramanjyu/z-game/game/MapEditor'

import sprite from '@doramanjyu/z-game/images/sprite.png'

const MapEditorPage = () => (
  <main>
    <title>MapEditor</title>
    <MapEditor sprite={sprite} />
  </main>
)

export default MapEditorPage
