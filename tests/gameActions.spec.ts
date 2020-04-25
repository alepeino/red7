import { CardColor } from '../src/models/card'
import { GameState } from '../src/models/game'
import { playCardToPalette } from '../src/models/game-logic/actions'
import { makePlayers } from './utils'

describe('Game Actions', () => {
  describe('Playing card to palette', () => {
    it('should take card from 1st player hand and add to their palette', () => {
      const players = makePlayers([
        {
          hand: [
            { color: CardColor.BLUE, number: 3 },
            { color: CardColor.ORANGE, number: 5 },
          ],
          palette: [{ color: CardColor.BLUE, number: 1 }],
        },
        {
          hand: [{ color: CardColor.YELLOW, number: 5 }],
          palette: [{ color: CardColor.BLUE, number: 1 }],
        },
        {
          hand: [{ color: CardColor.GREEN, number: 2 }],
          palette: [{ color: CardColor.RED, number: 1 }],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.RED, number: 0 }],
        players,
      }
      const newState = playCardToPalette(state, players[0].id, {
        color: CardColor.ORANGE,
        number: 5,
      })
      expect(newState.players[0].hand).toHaveLength(1)
      expect(newState.players[1].hand).toHaveLength(1)
      expect(newState.players[2].hand).toHaveLength(1)
      expect(newState.players[0].palette).toHaveLength(2)
      expect(newState.players[0].palette[1].color).toEqual(CardColor.ORANGE)
      expect(newState.players[0].palette[1].number).toEqual(5)
    })

    it('should take card from 2nd player hand and add to their palette', () => {
      const players = makePlayers([
        {
          hand: [
            { color: CardColor.BLUE, number: 3 },
            { color: CardColor.ORANGE, number: 5 },
          ],
          palette: [{ color: CardColor.BLUE, number: 1 }],
        },
        {
          hand: [{ color: CardColor.YELLOW, number: 5 }],
          palette: [{ color: CardColor.BLUE, number: 1 }],
        },
        {
          hand: [{ color: CardColor.GREEN, number: 2 }],
          palette: [{ color: CardColor.RED, number: 1 }],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.RED, number: 0 }],
        players,
      }
      const newState = playCardToPalette(state, players[1].id, {
        color: CardColor.YELLOW,
        number: 5,
      })
      expect(newState.players[0].hand).toHaveLength(2)
      expect(newState.players[1].hand).toHaveLength(0)
      expect(newState.players[2].hand).toHaveLength(1)
      expect(newState.players[1].palette).toHaveLength(2)
      expect(newState.players[1].palette[1].color).toEqual(CardColor.YELLOW)
      expect(newState.players[1].palette[1].number).toEqual(5)
    })
  })
})
