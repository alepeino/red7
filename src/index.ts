import { initState, setup } from './models/game'
import { render } from './view/game'

const game = setup(initState())
render(game)
