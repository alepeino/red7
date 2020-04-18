import React, { useReducer } from 'react'
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
  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <Game {...state} />
    </DispatchContext.Provider>
  )
}

ReactDOM.render(<App/>, root)
