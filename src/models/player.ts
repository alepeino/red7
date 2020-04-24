import { Card } from './card'

export interface Player {
  id: any
  name: string
  hand: Card[]
  palette: Card[]
  lost: boolean
}
