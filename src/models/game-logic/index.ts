import entries from 'lodash/fp/entries'
import first from 'lodash/fp/first'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import groupBy from 'lodash/fp/groupBy'
import last from 'lodash/fp/last'
import map from 'lodash/fp/map'
import maxBy from 'lodash/fp/maxBy'
import nth from 'lodash/fp/nth'
import update from 'lodash/fp/update'
import { Card, CardColor } from '../card'
import { GameState } from '../game'
import { Player } from '../player'
import { tiebreakMatchingCards } from './tiebreaking'
import { cardsOfNumber, highestCardNumberAmongPlayers } from './utils'

export function winningPlayer(state: GameState): Player['id'] {
  const playersMatchingCards = map(
    update('palette', getFilteringRule(state)),
    state.players
  )
  return tiebreakMatchingCards(playersMatchingCards).id
}

function getFilteringRule(state: GameState): (palette: Card[]) => Card[] {
  const rules: any = {
    [CardColor.RED]: cardsOfNumber(
      highestCardNumberAmongPlayers(state.players)
    ),
    [CardColor.ORANGE]: flow(groupBy('number'), entries, maxBy(first), nth(1)),
  }

  return rules[get('color', last(state.canvas) || { color: CardColor.RED })]
}
