import range from 'lodash/fp/range'

export const cardColors = range(1, 8)
export const cardNumbers = range(1, 8)

export interface Card {
  color: number
  number: number
}
