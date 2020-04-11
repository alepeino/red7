import JsxDom from 'jsx-dom'
import { canvasRules, Card } from '../../models/card'
import './card.css'

export function Card ({ card, horizontal = false }: { card?: Card, horizontal?: boolean }) {
  if (!card) {
    return null
  }
  return (
    <div class={['card', `card-${card.color}`, { horizontal }]}>
      { horizontal
        ? <span>{canvasRules[card.color as keyof typeof canvasRules]}</span>
        : <span>{card.number}</span>}
    </div>
  )
}
