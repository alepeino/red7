import { Player } from '../src/models/player'

export function makePlayers(
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
