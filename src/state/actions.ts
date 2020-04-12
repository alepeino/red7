import { createAction } from 'typesafe-actions'
import { Card } from '../models/card'

export const playToCanvas = createAction('playToCanvas')<Card>()
