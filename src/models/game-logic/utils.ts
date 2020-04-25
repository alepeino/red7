import defaultTo from 'lodash/fp/defaultTo'
import eq from 'lodash/fp/eq'
import filter from 'lodash/fp/filter'
import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import max from 'lodash/fp/max'
import { Card, CardNumber } from '../card'
import { Player } from '../player'

export const cardsOfNumber = (n: CardNumber) =>
  filter(flow(get('number'), eq(n)))

export const highestCardNumberAmongPlayers: (
  players: Player[]
) => Card['number'] = flow(
  map('palette'),
  flatten,
  map('number'),
  max,
  defaultTo(0)
)
