import last from 'lodash/fp/last'
import React from 'react'
import { Card as CardModel } from '../../models/card'
import { Card } from '../card'

const Canvas: React.FC<{ cards: CardModel[] }> = ({ cards }) => {
  return (
    <div>
      <Card card={last(cards)} horizontal={true}/>
    </div>
  )
}

export { Canvas }
