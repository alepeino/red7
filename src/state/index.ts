import add from 'lodash/fp/add'
import get from 'lodash/fp/get'
import update from 'lodash/fp/update'
import React from 'react'
import { createStore, reduxDevToolsExt } from 'react-hooks-global-state'
import { ActionType, createReducer } from 'typesafe-actions'
import { GameState, initState, setup } from '../models/game'
import * as actions from './actions'

type Actions = ActionType<typeof actions>

const PRODUCTION = get(['Component', 'name'], React) !== 'Component'

const initialState = setup(initState())

const reducer = createReducer<GameState, Actions>(
  initialState
).handleAction(actions.playToCanvas, (s, a) =>
  update('activePlayer', add(1), s)
)

export const { useGlobalStateProvider, getState, dispatch } = createStore(
  reducer,
  initialState,
  PRODUCTION ? undefined : reduxDevToolsExt()
)
