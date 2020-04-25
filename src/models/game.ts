import shuffle from 'lodash/fp/shuffle'
import { Card, cardColors, cardNumbers } from './card'
import { Player } from './player'

export const STARTING_CARDS_IN_HAND = 7
export const STARTING_CARDS_IN_PALETTE = 1
export const STARTING_CANVAS_CARD: Card = { number: 0, color: 7 }

export interface GameState {
  players: Player[]
  deck: Card[]
  canvas: Card[]
  activePlayer?: Player['id']
  activePlayerPlayedToPalette?: boolean
  activePlayerPlayedToCanvas?: boolean
}

export function setup(state: GameState): GameState {
  const deck: Card[] = shuffle(state.deck)

  return {
    ...state,
    deck,
    canvas: [STARTING_CANVAS_CARD],
    players: state.players.map(player => ({
      ...player,
      hand: drawFromDeck(deck, STARTING_CARDS_IN_HAND),
      palette: drawFromDeck(deck, STARTING_CARDS_IN_PALETTE),
    })),
    activePlayer: state.players[0].id,
    activePlayerPlayedToPalette: false,
    activePlayerPlayedToCanvas: false,
  }
}

export function initState(playerNames: string[] = ['A', 'B']): GameState {
  return {
    players: playerNames.map(createPlayer),
    deck: createDeck(),
    canvas: [],
  }
}

function createDeck(): Card[] {
  const deck: Card[] = []
  cardColors.forEach(number =>
    cardNumbers.forEach(color => deck.push({ color, number }))
  )
  return deck
}

function createPlayer(name: string): Player {
  return {
    id: name,
    name,
    hand: [],
    palette: [],
    lost: false,
  }
}

function drawFromDeck(deck: Card[], quantity: number): Card[] {
  return deck.splice(0, quantity)
}
