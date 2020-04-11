import JsxDom from 'jsx-dom'
import morphdom from 'morphdom'
import { GameState } from '../models/game'

export function render (s: GameState) {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('No root element')
  }
  morphdom(root, root)
}
