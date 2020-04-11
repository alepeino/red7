import JsxDom from 'jsx-dom'
import last from 'lodash/fp/last'
import { Card as CardModel } from '../../models/card'
import { Card } from '../card'

export function Canvas ({ cards }: { cards: CardModel[] }) {
  return (
    <div>
      <Card card={last(cards)} horizontal={true}/>
    </div>
  )
}
