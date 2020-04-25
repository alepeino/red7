import React from 'react'
import { GameState } from '../../models/game'
import { Canvas } from '../canvas'
import { Player } from '../player'

const Game: React.FC<GameState> = state => {
  return (
    <div className="select-none">
      <Canvas cards={state.canvas} state={state} />
      {state.players.map(p => (
        <Player key={p.name} player={p} state={state} />
      ))}
    </div>
  )
}

export { Game }
