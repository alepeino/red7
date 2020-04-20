import React from 'react'
import { DndProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import ReactDOM from 'react-dom'
import './index.scss'
import { getState, useGlobalStateProvider } from './state'
import { Game } from './view/game'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element')
}

function App() {
  useGlobalStateProvider()

  const options = {
    enableTouchEvents: false,
    enableMouseEvents: true,
  }

  return (
    <DndProvider backend={TouchBackend} options={options}>
      <Game {...getState()} />
    </DndProvider>
  )
}

ReactDOM.render(<App />, root)
