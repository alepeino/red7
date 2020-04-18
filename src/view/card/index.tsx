import classNames from 'classnames'
import React, { FunctionComponent, useContext } from 'react'
import { canvasRules, Card as CardModel } from '../../models/card'
import styles from './card.scss'
import { DispatchContext } from '../../state'
import { playToCanvas } from '../../state/actions'

const Card: FunctionComponent<{ card?: CardModel, horizontal?: boolean }> = ({ card, horizontal = false }) => {
  const { dispatch } = useContext(DispatchContext)
  if (!card) {
    return null
  }
  return (
    <button
      onClick={() => dispatch(playToCanvas(card))}
      className={classNames([
      'text-white rounded-lg flex justify-center items-center',
      styles.card, styles[`card-${card.color}`], { [styles.horizontal]: horizontal }
    ])}>
      {horizontal
        ? <span className="text-center">{canvasRules[card.color as keyof typeof canvasRules]}</span>
        : <span>{card.number}</span>}
    </button>
  )
}

export { Card }
