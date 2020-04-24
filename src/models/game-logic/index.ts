import eq from 'lodash/fp/eq'
import filter from 'lodash/fp/filter'
import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import max from 'lodash/fp/max'
import update from 'lodash/fp/update'
import { CardNumber } from '../card'
import { GameState } from '../game'
import { Player } from '../player'
import { tiebreakMatchingCards } from './tiebreaking'

const filterCardsOfNumber = (n: CardNumber) =>
  filter(flow(get('number'), eq(n)))

export function winningPlayer(state: GameState): Player['id'] {
  const highestCard = flow(
    map('palette'),
    flatten,
    map('number'),
    max
  )(state.players)

  const playersMatchingCards = map(
    update('palette', filterCardsOfNumber(highestCard)),
    state.players
  )

  return tiebreakMatchingCards(playersMatchingCards).id
}
