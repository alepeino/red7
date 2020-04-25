import curry from 'lodash/fp/curry'
import range from 'lodash/fp/range'

export enum CardColor {
  RED = 7,
  ORANGE = 6,
  YELLOW = 5,
  GREEN = 4,
  BLUE = 3,
  INDIGO = 2,
  VIOLET = 1,
}

export type CardNumber = number

export interface Card {
  color: CardColor
  number: CardNumber
}

export const cardColors = range(1, 8)

export const cardNumbers = range(1, 8)

export const canvasRules: Record<CardColor, string> = {
  [CardColor.VIOLET]: 'Cards below 4',
  [CardColor.INDIGO]: 'Cards that form a run',
  [CardColor.BLUE]: 'Cards of different colors',
  [CardColor.GREEN]: 'Even cards',
  [CardColor.YELLOW]: 'Cards of a same color',
  [CardColor.ORANGE]: 'Cards of a same number',
  [CardColor.RED]: 'Highest card',
}

export const serializeCard = (c: Card) => `c${c.color}n${c.number}`

export const cardEquals = curry(
  (c1: Card, c2: Card) => c1.number === c2.number && c1.color === c2.color
)
