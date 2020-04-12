import JsxDom from 'jsx-dom'
import { canvasRules, Card } from '../../models/card'
import styles from './card.css'

export function Card ({ card, horizontal = false }: { card?: Card, horizontal?: boolean }) {
  if (!card) {
    return null
  }
  return (
    <div class={[
      'text-white rounded-lg flex justify-center items-center',
      styles.card, styles[`card-${card.color}`], { [styles.horizontal]: horizontal }
    ]}>
      { horizontal
        ? <span class="text-center">{canvasRules[card.color as keyof typeof canvasRules]}</span>
        : <span>{card.number}</span>}
    </div>
  )
}
