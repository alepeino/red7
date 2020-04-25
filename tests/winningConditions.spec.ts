import { CardColor } from '../src/models/card'
import { GameState } from '../src/models/game'
import { winningPlayer } from '../src/models/game-logic'
import { makePlayers } from './utils'

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
      expect(winningPlayer(state)).toBe(0)
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
      expect(winningPlayer(state)).toBe(1)
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
      expect(winningPlayer(state)).toBe(0)
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
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.BLUE, number: 1 },
            { color: CardColor.GREEN, number: 6 },
            { color: CardColor.GREEN, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.GREEN, number: 3 },
            { color: CardColor.VIOLET, number: 6 },
            { color: CardColor.GREEN, number: 1 },
            { color: CardColor.RED, number: 1 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.RED, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: ORANGE', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.INDIGO, number: 5 },
          ],
        },
        {
          palette: [{ color: CardColor.RED, number: 7 }],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.ORANGE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.INDIGO, number: 5 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 3 },
            { color: CardColor.YELLOW, number: 3 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.ORANGE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.RED, number: 5 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 6 },
            { color: CardColor.YELLOW, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.ORANGE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.GREEN, number: 5 },
            { color: CardColor.ORANGE, number: 5 },
          ],
        },
        {
          palette: [
            { color: CardColor.BLUE, number: 5 },
            { color: CardColor.RED, number: 5 },
            { color: CardColor.INDIGO, number: 5 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.ORANGE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.VIOLET, number: 2 },
            { color: CardColor.INDIGO, number: 2 },
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.RED, number: 1 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 7 },
            { color: CardColor.INDIGO, number: 7 },
            { color: CardColor.GREEN, number: 1 },
            { color: CardColor.BLUE, number: 2 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.ORANGE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: YELLOW', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.YELLOW, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.GREEN, number: 7 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.YELLOW, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.INDIGO, number: 5 },
            { color: CardColor.INDIGO, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 3 },
            { color: CardColor.RED, number: 6 },
            { color: CardColor.RED, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.YELLOW, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.YELLOW, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 1 },
            { color: CardColor.YELLOW, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.YELLOW, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.GREEN, number: 5 },
            { color: CardColor.GREEN, number: 4 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 5 },
            { color: CardColor.RED, number: 2 },
            { color: CardColor.RED, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.YELLOW, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.YELLOW, number: 6 },
            { color: CardColor.BLUE, number: 1 },
            { color: CardColor.GREEN, number: 5 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 6 },
            { color: CardColor.GREEN, number: 4 },
            { color: CardColor.GREEN, number: 1 },
            { color: CardColor.YELLOW, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.YELLOW, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: GREEN', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 6 },
            { color: CardColor.YELLOW, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.GREEN, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.GREEN, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.RED, number: 4 },
            { color: CardColor.RED, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.INDIGO, number: 2 },
            { color: CardColor.INDIGO, number: 6 },
            { color: CardColor.INDIGO, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.GREEN, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.YELLOW, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.BLUE, number: 2 },
            { color: CardColor.BLUE, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.GREEN, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.GREEN, number: 6 },
            { color: CardColor.GREEN, number: 4 },
            { color: CardColor.GREEN, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 6 },
            { color: CardColor.RED, number: 2 },
            { color: CardColor.RED, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.GREEN, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.INDIGO, number: 2 },
            { color: CardColor.YELLOW, number: 6 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.INDIGO, number: 3 },
            { color: CardColor.INDIGO, number: 1 },
            { color: CardColor.BLUE, number: 6 },
            { color: CardColor.RED, number: 1 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.GREEN, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: BLUE', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 6 },
            { color: CardColor.BLUE, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.YELLOW, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.BLUE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.RED, number: 4 },
            { color: CardColor.BLUE, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.INDIGO, number: 1 },
            { color: CardColor.GREEN, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.BLUE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.BLUE, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.BLUE, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.BLUE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.ORANGE, number: 6 },
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.GREEN, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 6 },
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.GREEN, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.BLUE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.ORANGE, number: 6 },
            { color: CardColor.ORANGE, number: 7 },
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.BLUE, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.GREEN, number: 5 },
            { color: CardColor.BLUE, number: 6 },
            { color: CardColor.INDIGO, number: 4 },
            { color: CardColor.GREEN, number: 1 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.BLUE, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: INDIGO', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.INDIGO, number: 5 },
            { color: CardColor.INDIGO, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.YELLOW, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.INDIGO, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.RED, number: 3 },
            { color: CardColor.INDIGO, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.INDIGO, number: 1 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.INDIGO, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.INDIGO, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 4 },
            { color: CardColor.INDIGO, number: 5 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.INDIGO, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.ORANGE, number: 6 },
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.GREEN, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 6 },
            { color: CardColor.BLUE, number: 5 },
            { color: CardColor.GREEN, number: 4 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.INDIGO, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.ORANGE, number: 4 },
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.RED, number: 7 },
            { color: CardColor.GREEN, number: 6 },
          ],
        },
        {
          palette: [
            { color: CardColor.BLUE, number: 2 },
            { color: CardColor.VIOLET, number: 3 },
            { color: CardColor.INDIGO, number: 4 },
            { color: CardColor.VIOLET, number: 5 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.INDIGO, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })
  })

  describe('Canvas rule: VIOLET', () => {
    it('1st player should win with 2 to 1', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.VIOLET, number: 2 },
            { color: CardColor.VIOLET, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.YELLOW, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('2nd player should win with 3 to 2', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.RED, number: 3 },
            { color: CardColor.VIOLET, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.VIOLET, number: 1 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 2 to 2 tiebreaking by number', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.YELLOW, number: 1 },
            { color: CardColor.VIOLET, number: 2 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.VIOLET, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('2nd player should win with 3 to 3 tiebreaking by color', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.ORANGE, number: 1 },
            { color: CardColor.YELLOW, number: 3 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.RED, number: 1 },
            { color: CardColor.BLUE, number: 2 },
            { color: CardColor.GREEN, number: 3 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(1)
    })

    it('extra cards are ignored', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.GREEN, number: 1 },
            { color: CardColor.YELLOW, number: 2 },
            { color: CardColor.INDIGO, number: 4 },
            { color: CardColor.RED, number: 3 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 5 },
            { color: CardColor.YELLOW, number: 1 },
            { color: CardColor.INDIGO, number: 1 },
            { color: CardColor.VIOLET, number: 7 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(0)
    })

    it('it should return null if no player is winning', () => {
      const players = makePlayers([
        {
          palette: [
            { color: CardColor.VIOLET, number: 5 },
            { color: CardColor.VIOLET, number: 4 },
          ],
        },
        {
          palette: [
            { color: CardColor.YELLOW, number: 7 },
            { color: CardColor.YELLOW, number: 6 },
          ],
        },
      ])
      const state: GameState = {
        deck: [],
        canvas: [{ color: CardColor.VIOLET, number: 0 }],
        players,
      }
      expect(winningPlayer(state)).toBe(null)
    })
  })
})
