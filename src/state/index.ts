import get from 'lodash/fp/get'
import React from 'react'
import { createStore, reduxDevToolsExt } from 'react-hooks-global-state'
import { ActionType, createReducer } from 'typesafe-actions'
import { GameState, initState, setup } from '../models/game'
import { playCardToCanvas } from '../models/game-logic/actions'
import * as actions from './actions'

type Actions = ActionType<typeof actions>

const PRODUCTION = get(['Component', 'name'], React) !== 'Component'

const initialState = setup(initState())

const reducer = createReducer<GameState, Actions>(
  initialState
).handleAction(actions.playToCanvas, (state, { payload }) =>
  playCardToCanvas(state, state.activePlayer, payload)
)

export const { useGlobalStateProvider, getState, dispatch } = createStore(
  reducer,
  initialState,
  PRODUCTION ? undefined : reduxDevToolsExt()
)
