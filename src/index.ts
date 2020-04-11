import { initState, setup } from './models/game'
import { render } from './view/game'
import './index.css'

const game = setup(initState())
render(game)
