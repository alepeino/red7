import { CardColor } from '../src/models/card'
import { GameState } from '../src/models/game'
import { winningPlayer } from '../src/models/game-logic'
import { Player } from '../src/models/player'

describe('Game logic', () => {
  describe('Determine winning player', () => {
    describe('Canvas rule: RED', () => {
      it('1st player should win with highest card', () => {
        const players = makePlayers([
          { palette: [{ color: CardColor.ORANGE, number: 5 }] },
          { palette: [{ color: CardColor.RED, number: 3 }] },
        ])
        const state: GameState = {
          deck: [],
          canvas: [{ color: CardColor.RED, number: 0 }],
          players,
        }
        expect(winningPlayer(state)).toEqual(0)
      })
      it('2nd player should win with highest card', () => {
        const players = makePlayers([
          { palette: [{ color: CardColor.ORANGE, number: 2 }] },
          { palette: [{ color: CardColor.VIOLET, number: 4 }] },
          { palette: [{ color: CardColor.RED, number: 3 }] },
        ])
        const state: GameState = {
          deck: [],
          canvas: [{ color: CardColor.RED, number: 0 }],
          players,
        }
        expect(winningPlayer(state)).toEqual(1)
      })
      it('1st player should win with highest card, tiebreaking by color', () => {
        const players = makePlayers([
          { palette: [{ color: CardColor.ORANGE, number: 5 }] },
          { palette: [{ color: CardColor.VIOLET, number: 5 }] },
        ])
        const state: GameState = {
          deck: [],
          canvas: [{ color: CardColor.RED, number: 0 }],
          players,
        }
        expect(winningPlayer(state)).toEqual(0)
      })
      it('2nd player should win with highest card, tiebreaking by color', () => {
        const players = makePlayers([
          { palette: [{ color: CardColor.ORANGE, number: 5 }] },
          { palette: [{ color: CardColor.RED, number: 5 }] },
          { palette: [{ color: CardColor.VIOLET, number: 5 }] },
        ])
        const state: GameState = {
          deck: [],
          canvas: [{ color: CardColor.RED, number: 0 }],
          players,
        }
        expect(winningPlayer(state)).toEqual(1)
      })
    })
  })
})

function makePlayers(
  players: Partial<Pick<Player, 'palette' | 'hand'>>[]
): Player[] {
  return players.map(({ palette = [], hand = [] }, i) => ({
    id: i,
    name: i.toString(),
    hand,
    palette,
    lost: false,
  }))
}
