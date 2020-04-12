import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { initState, setup } from './models/game'
import { Game } from './view/game'

const game = setup(initState())

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element')
}

ReactDOM.render(<Game {...game} />, root)
