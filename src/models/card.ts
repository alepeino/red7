import range from 'lodash/fp/range'

export const cardColors = range(1, 8)
export const cardNumbers = range(1, 8)
export const canvasRules = {
  1: 'Cards below 4',
  2: 'Cards that form a run',
  3: 'Cards of different colors',
  4: 'Even cards',
  5: 'Cards of a same color',
  6: 'Cards of a same number',
  7: 'Highest card'
}

export interface Card {
  color: number
  number: number
}
