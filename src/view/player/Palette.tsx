import classNames from 'classnames'
import constant from 'lodash/fp/constant'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Card as CardModel, serializeCard } from '../../models/card'
import { GameState } from '../../models/game'
import { Player } from '../../models/player'
import { Card, CARD_DRAG_TYPE } from '../card'
import styles from './Palette.scss'

export const PALETTE_DROP_RESULT = { type: 'palette' }

const Palette: React.FC<{
  cards: CardModel[]
  playerId: Player['id']
  state: GameState
}> = ({ cards, playerId, state }) => {
  const [{ hovered, movingCard }, drop] = useDrop({
    accept: CARD_DRAG_TYPE,
    drop: constant(PALETTE_DROP_RESULT),
    canDrop: () => playerId === state.activePlayer,
    collect: monitor => ({
      hovered: monitor.isOver(),
      movingCard: monitor.getItem(),
    }),
  })

  return (
    <div
      ref={drop}
      className={classNames(
        'flex p-3',
        styles.palette,
        movingCard && styles.highlight,
        movingCard && hovered && styles[`hover-card-${movingCard.color}`]
      )}
    >
      {cards.map(card => (
        <Card key={serializeCard(card)} card={card} />
      ))}
    </div>
  )
}

export { Palette }
