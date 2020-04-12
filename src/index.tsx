import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Game } from './view/game'
import { DispatchContext, initialState, reducer } from './state'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element')
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <Game {...state} />
    </DispatchContext.Provider>
  )
}

ReactDOM.render(<App/>, root)
