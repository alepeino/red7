import classNames from 'classnames'
import React from 'react'
import { serializeCard } from '../../models/card'
import { GameState } from '../../models/game'
import { Player as PlayerModel } from '../../models/player'
import { Card, PlayableCard } from '../card'
import { Palette } from './Palette'
import styles from './Player.scss'

const Player: React.FC<{ player: PlayerModel; state: GameState }> = ({
  player: { id, name, hand, palette },
  state,
}) => {
  const CardComponent = state.activePlayer === id ? PlayableCard : Card
  return (
    <div>
      <h2 className="text-3xl pt-3 pl-3 text-teal-900">{name}</h2>
      <Palette cards={palette} playerId={id} state={state} />
      <div className={classNames(['flex', 'justify-end', styles.hand])}>
        {hand.map(card => (
          <CardComponent key={serializeCard(card)} card={card} />
        ))}
      </div>
    </div>
  )
}

export { Player }
