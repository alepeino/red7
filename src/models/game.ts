import shuffle from 'lodash/fp/shuffle'
import { Player } from './player'
import { Card, cardColors, cardNumbers } from './card'

export const STARTING_CARDS_IN_HAND = 7
export const STARTING_CARDS_IN_PALETTE = 1
export const STARTING_CANVAS_CARD: Card = { number: 0, color: 7 }

export interface GameState {
  players: Player[]
  activePlayer?: number
  deck: Card[]
  canvas: Card[]
}

export function setup (state: GameState): GameState {
  const deck: Card[] = shuffle(state.deck)

  return {
    ...state,
    deck,
    canvas: [STARTING_CANVAS_CARD],
    players: state.players.map(player => ({
      ...player,
      hand: drawFromDeck(deck, STARTING_CARDS_IN_HAND),
      palette: drawFromDeck(deck, STARTING_CARDS_IN_PALETTE)
    })),
    activePlayer: 0
  }
}

export function initState (): GameState {
  return {
    players: [createPlayer('A'), createPlayer('B')],
    deck: createDeck(),
    canvas: []
  }
}

function createDeck (): Card[] {
  const deck: Card[] = []
  cardColors.forEach(number => cardNumbers.forEach(color => deck.push({ color, number })))
  return deck
}

function createPlayer (name: string): Player {
  return {
    name,
    hand: [],
    palette: [],
    lost: false,
    playedToCanvas: false,
    playedToPalette: false
  }
}

function drawFromDeck (deck: Card[], quantity: number): Card[] {
  return deck.splice(0, quantity)
}
