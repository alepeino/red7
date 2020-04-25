import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import isEmpty from 'lodash/fp/isEmpty'
import map from 'lodash/fp/map'
import max from 'lodash/fp/max'
import negate from 'lodash/fp/negate'
import slice from 'lodash/fp/slice'
import { Player } from '../player'
import { cardsOfNumber, highestCardNumberAmongPlayers } from './utils'

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
    resolver: tiebreakByNumber,
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

function tiebreakByNumber(players: Player[]): Player[] {
  const highestCard = highestCardNumberAmongPlayers(players)
  return players.filter(
    flow(get('palette'), cardsOfNumber(highestCard), negate(isEmpty))
  )
}

function tiebreakByColor(players: Player[]): Player[] {
  const highestColor = flow(map('palette'), flatten, map('color'), max)(players)

  return players.filter(player =>
    player.palette.some(c => c.color === highestColor)
  )
}
