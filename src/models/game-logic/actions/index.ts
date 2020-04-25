import concat from 'lodash/fp/concat'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import partialRight from 'lodash/fp/partialRight'
import remove from 'lodash/fp/remove'
import update from 'lodash/fp/update'
import { Card, cardEquals } from '../../card'
import { GameState } from '../../game'
import { Player } from '../../player'

export function playCardToPalette(
  state: GameState,
  playerId: Player['id'],
  card: Card
): GameState {
  return flow(
    update('players', map(update('hand', remove(cardEquals(card))))),
    update(
      'players',
      map((player: Player) =>
        player.id === playerId
          ? update('palette', partialRight(concat, [card]), player)
          : player
      )
    )
  )(state)
}
