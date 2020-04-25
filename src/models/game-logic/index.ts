import entries from 'lodash/fp/entries'
import filter from 'lodash/fp/filter'
import first from 'lodash/fp/first'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import groupBy from 'lodash/fp/groupBy'
import last from 'lodash/fp/last'
import map from 'lodash/fp/map'
import maxBy from 'lodash/fp/maxBy'
import nth from 'lodash/fp/nth'
import sortBy from 'lodash/fp/sortBy'
import uniqBy from 'lodash/fp/uniqBy'
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
    [CardColor.YELLOW]: flow(groupBy('color'), entries, maxBy(first), nth(1)),
    [CardColor.GREEN]: filter<Card>(c => c.number % 2 === 0),
    [CardColor.BLUE]: uniqBy('color'),
    [CardColor.INDIGO]: flow(
      sortBy('number'),
      (cards: Card[]) => cards.map((card, i, all) => all.slice(0, i + 1)),
      (runs: Card[][]) =>
        runs.filter(run =>
          run.every((card, i, all) => {
            const previous = all[i - 1]
            return !previous || card.number - previous.number === 1
          })
        ),
      maxBy('length')
    ),
    [CardColor.VIOLET]: filter<Card>(c => c.number < 4),
  }

  return rules[get('color', last(state.canvas) || { color: CardColor.RED })]
}
