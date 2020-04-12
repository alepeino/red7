import intersectionBy from 'lodash/fp/intersectionBy'
import { initState, setup, STARTING_CARDS_IN_HAND, STARTING_CARDS_IN_PALETTE } from '../src/models/game'
import { Card, cardColors, cardNumbers, serializeCard } from '../src/models/card'
import { Player } from '../src/models/player'

describe('Game setup', () => {
  describe('initState', () => {
    it('should initialize', () => {
      const state = initState()
      expect(state.deck).toHaveLength(cardNumbers.length * cardColors.length)
      expect(state.canvas).toHaveLength(0)
      expect(state.players.length).toBeGreaterThan(1)
      state.players.forEach(player => {
        expect(player.hand).toHaveLength(0)
        expect(player.palette).toHaveLength(0)
      })
    })
  })

  describe('setup', () => {
    it('should make first player active', () => {
      const state = setup(initState())
      expect(state.players.length).toBeGreaterThan(1)
      expect(state.activePlayer).toBe(0)
    })

    it('should deal 7 cards to all players', () => {
      const state = setup(initState())
      expect(state.players.length).toBeGreaterThan(1)
      state.players.forEach(player => {
        expect(player.hand).toHaveLength(STARTING_CARDS_IN_HAND)
      })
    })

    it('should add 1 card to each player\'s palette', () => {
      const state = setup(initState())
      expect(state.players.length).toBeGreaterThan(1)
      state.players.forEach(player => {
        expect(player.palette).toHaveLength(1)
      })
    })

    it('should have dealt cards from deck', () => {
      const state = setup(initState())
      const intersection = intersectionBy<Card, Card>(serializeCard)
      const playerCards = (player: Player) => [...player.hand, ...player.palette]

      state.players.forEach((player, i, allPlayers) => {
        expect(intersection(state.deck, playerCards(player))).toHaveLength(0)
        if (i > 0) {
          expect(intersection(playerCards(player), playerCards(allPlayers[i - 1]))).toHaveLength(0)
        }
      })

      const dealtCards = state.players.length * (STARTING_CARDS_IN_HAND + STARTING_CARDS_IN_PALETTE)
      expect(state.deck).toHaveLength(cardColors.length * cardNumbers.length - dealtCards)
    })
  })
})
