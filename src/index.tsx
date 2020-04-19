import React, { useReducer } from 'react'
import { DndProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import ReactDOM from 'react-dom'
import './index.scss'
import { DispatchContext, initialState, reducer } from './state'
import { Game } from './view/game'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element')
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const options = {
    enableTouchEvents: false,
    enableMouseEvents: true
  }
  return (
    <DndProvider backend={TouchBackend} options={options}>
      <DispatchContext.Provider value={{ dispatch }}>
        <Game {...state} />
      </DispatchContext.Provider>
    </DndProvider>
  )
}

ReactDOM.render(<App/>, root)
