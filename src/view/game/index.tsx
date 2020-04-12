import React, { FunctionComponent } from 'react'
import { GameState } from '../../models/game'
import { Canvas } from '../canvas'
import { Player } from '../player'

export const Game: FunctionComponent<GameState> = ({ canvas, players }) => {
  return (
    <div id="root">
      <Canvas cards={canvas}/>
      {players.map(p => <Player key={p.name} {...p} />)}
    </div>
  )
}
