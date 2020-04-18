import React from 'react'
import { GameState } from '../../models/game'
import { Canvas } from '../canvas'
import { Player } from '../player'

const Game: React.FC<GameState> = ({ canvas, players }) => {
  return (
    <>
      <Canvas cards={canvas}/>
      {players.map(p => <Player key={p.name} {...p} />)}
    </>
  )
}

export { Game }
