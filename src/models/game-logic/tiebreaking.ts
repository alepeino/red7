import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import max from 'lodash/fp/max'
import slice from 'lodash/fp/slice'
import { Player } from '../player'

type TiebreakCriterion =
  | 'size'
  | 'highestCardNumber'
  | 'highestCardColor'
  | 'exception'

const tiebreakCriteria: Record<
  TiebreakCriterion,
  { resolver: (p: Player[]) => Player[]; nextCriterion?: TiebreakCriterion }
> = {
  size: {
    resolver: tiebreakByLength,
    nextCriterion: 'highestCardNumber',
  },
  highestCardNumber: {
    resolver: tiebreakByColor,
    nextCriterion: 'highestCardColor',
  },
  highestCardColor: {
    resolver: tiebreakByColor,
    nextCriterion: 'exception',
  },
  exception: {
    resolver: slice(0, 1),
  },
}

export function tiebreakMatchingCards(
  players: Player[],
  criterion: TiebreakCriterion = 'size'
): Player {
  if (players.length <= 1) {
    return players[0]
  }

  const { resolver, nextCriterion } = tiebreakCriteria[criterion]
  return tiebreakMatchingCards(resolver(players), nextCriterion)
}

function tiebreakByLength(players: Player[]): Player[] {
  const longestSetLength = max(map('palette.length', players))
  return players.filter(player => player.palette.length === longestSetLength)
}

function tiebreakByColor(players: Player[]): Player[] {
  const highestColor = flow(map('palette'), flatten, map('color'), max)(players)

  return players.filter(player =>
    player.palette.some(c => c.color === highestColor)
  )
}
