import classNames from 'classnames'
import React from 'react'
import { serializeCard } from '../../models/card'
import { Player as PlayerModel } from '../../models/player'
import { Card } from '../card'
import styles from './player.scss'

const Player: React.FC<PlayerModel> = ({ name, hand, palette }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div className="flex">
        {palette.map(card => <Card key={serializeCard(card)} card={card}/>)}
      </div>
      <div className={classNames(['flex', 'justify-end', styles.hand])}>
        {hand.map(card => <Card key={serializeCard(card)} card={card}/>)}
      </div>
    </div>
  )
}

export { Player }
