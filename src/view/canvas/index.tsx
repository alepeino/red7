import classNames from 'classnames'
import constant from 'lodash/fp/constant'
import last from 'lodash/fp/last'
import React from 'react'
import { useDrop } from 'react-dnd'
import { Card as CardModel } from '../../models/card'
import { Card, CARD_DRAG_TYPE } from '../card'
import styles from './canvas.scss'

export const CANVAS_DROP_RESULT = { type: 'canvas' }

const Canvas: React.FC<{ cards: CardModel[] }> = ({ cards }) => {
  const topCard = last(cards)

  const [{ highlighted, hovered, movingCard }, drop] = useDrop({
    accept: CARD_DRAG_TYPE,
    drop: constant(CANVAS_DROP_RESULT),
    collect: monitor => ({
      highlighted: monitor.canDrop(),
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
        highlighted && styles.highlight,
        hovered && movingCard && styles[`hover-card-${movingCard.color}`],
      ])}
    >
      {topCard && <Card card={topCard} horizontal={true} />}
    </div>
  )
}

export { Canvas }
