import classNames from 'classnames'
import React from 'react'
import { serializeCard } from '../../models/card'
import { GameState } from '../../models/game'
import { Player as PlayerModel } from '../../models/player'
import { Card, PlayableCard } from '../card'
import { Dashboard } from './Dashboard'
import { Palette } from './Palette'
import styles from './Player.scss'

const Player: React.FC<{ player: PlayerModel; state: GameState }> = ({
  player: { id, name, hand, palette },
  state,
}) => {
  const activePlayer = state.activePlayer === id
  const canPlayToPalette =
    activePlayer &&
    !state.activePlayerPlayedToPalette &&
    !state.activePlayerPlayedToCanvas
  const canPlayToCanvas = activePlayer && !state.activePlayerPlayedToCanvas
  const CardComponent = activePlayer ? PlayableCard : Card
  return (
    <div>
      <h2 className="text-3xl pt-2 pl-4 text-teal-900">{name}</h2>
      <div className="flex p-2 bg-teal-200">
        <div className="w-2/3">
          <Palette cards={palette} playerId={id} state={state} />
        </div>
        <div className="flex-1">
          <Dashboard {...{ activePlayer, canPlayToPalette, canPlayToCanvas }} />
        </div>
      </div>
      <div className={classNames(['flex', 'justify-end', styles.hand])}>
        {hand.map(card => (
          <CardComponent key={serializeCard(card)} card={card} />
        ))}
      </div>
    </div>
  )
}

export { Player }
