import classNames from 'classnames'
import React from 'react'
import { canvasRules, Card as CardModel } from '../../models/card'
import styles from './card.scss'

export const CARD_DRAG_TYPE = 'card'

const Card: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    card: CardModel
    horizontal?: boolean
    highlight?: boolean
  }
> = ({ card, horizontal = false, highlight = false }, ref) => (
  <button
    ref={ref}
    className={classNames([
      'text-white rounded-lg flex justify-center items-center focus:outline-none',
      styles.card,
      styles[`card-${card.color}`],
      {
        [styles.horizontal]: horizontal,
        [styles.highlight]: highlight,
      },
    ])}
  >
    {horizontal ? (
      <span className="text-center">{canvasRules[card.color]}</span>
    ) : (
      <span>{card.number}</span>
    )}
  </button>
)

const CardRef = React.forwardRef(Card)

export { CardRef as Card }
export * from './PlayableCard'
