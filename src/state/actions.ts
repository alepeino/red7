import { createAction } from 'typesafe-actions'
import { Card } from '../models/card'

export const playToCanvas = createAction('playToCanvas')<Card>()
export const playToPalette = createAction('playToPalette')<Card>()
