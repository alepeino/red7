import React, { FunctionComponent } from 'react'
import last from 'lodash/fp/last'
import { Card as CardModel } from '../../models/card'
import { Card } from '../card'

export const Canvas: FunctionComponent<{ cards: CardModel[] }> = ({ cards }) => {
  return (
    <div>
      <Card card={last(cards)} horizontal={true}/>
    </div>
  )
}
