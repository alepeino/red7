import classNames from 'classnames'
import constant from 'lodash/fp/constant'
import last from 'lodash/fp/last'
import React from 'react'
import { useDrop } from 'react-dnd'
import { Card as CardModel } from '../../models/card'
import { GameState } from '../../models/game'
import { winningPlayer } from '../../models/game-logic'
import { playCardToCanvas } from '../../models/game-logic/actions'
import { Card, CARD_DRAG_TYPE, DroppableCard } from '../card'
import styles from './canvas.scss'

export const CANVAS_DROP_RESULT = { type: 'canvas' }

const Canvas: React.FC<{ cards: CardModel[]; state: GameState }> = ({
  cards,
  state,
}) => {
  const topCard = last(cards)

  const [{ canDrop, hovered, movingCard }, drop] = useDrop({
    accept: CARD_DRAG_TYPE,
    drop: constant(CANVAS_DROP_RESULT),
    canDrop: (item: DroppableCard) => {
      if (state.activePlayerPlayedToCanvas) {
        return false
      }
      const stateAfterPlaying = playCardToCanvas(
        state,
        state.activePlayer,
        item
      )
      const playerWinningAfterPlaying = winningPlayer(stateAfterPlaying)
      return (
        playerWinningAfterPlaying &&
        playerWinningAfterPlaying === state.activePlayer
      )
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver(),
      movingCard: monitor.getItem(),
    }),
  })

  return (
    <div
      ref={drop}
      className={classNames([
        'p-6 flex justify-center',
        styles.canvas,
        canDrop && styles.highlight,
        canDrop &&
          hovered &&
          movingCard &&
          styles[`hover-card-${movingCard.color}`],
      ])}
    >
      {topCard && <Card card={topCard} horizontal={true} />}
    </div>
  )
}

export { Canvas }
