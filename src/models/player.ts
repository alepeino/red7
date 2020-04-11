import { Card } from './card'

export interface Player {
  name: string
  hand: Card[]
  palette: Card[]
  playedToPalette: boolean
  playedToCanvas: boolean
  lost: boolean
}
