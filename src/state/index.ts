import add from 'lodash/fp/add'
import update from 'lodash/fp/update'
import { createContext, Dispatch } from 'react'
import { ActionType, createReducer } from 'typesafe-actions'
import { GameState, initState, setup } from '../models/game'
import * as actions from './actions'

type Actions = ActionType<typeof actions>

export const DispatchContext = createContext<{ dispatch: Dispatch<Actions> }>(
  undefined as any
)

export const initialState = setup(initState())

export const reducer = createReducer<GameState, Actions>(
  initialState
).handleAction(actions.playToCanvas, (s, a) =>
  update('activePlayer', add(1), s)
)
