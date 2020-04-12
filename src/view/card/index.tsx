import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { canvasRules, Card as CardModel } from '../../models/card'
import styles from './card.css'

export const Card: FunctionComponent<{ card?: CardModel, horizontal?: boolean }> = ({ card, horizontal = false }) => {
  if (!card) {
    return null
  }
  return (
    <div className={classNames([
      'text-white rounded-lg flex justify-center items-center',
      styles.card, styles[`card-${card.color}`], { [styles.horizontal]: horizontal }
    ])}>
      {horizontal
        ? <span className="text-center">{canvasRules[card.color as keyof typeof canvasRules]}</span>
        : <span>{card.number}</span>}
    </div>
  )
}
