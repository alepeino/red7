import React from 'react'
import { GameState } from '../../models/game'
import { Canvas } from '../canvas'
import { Player } from '../player'

const Game: React.FC<GameState> = ({ canvas, players }) => {
  return (
    <div className="select-none">
      <Canvas cards={canvas}/>
      {players.map(p => <Player key={p.name} {...p} />)}
    </div>
  )
}

export { Game }
