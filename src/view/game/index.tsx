import JsxDom from 'jsx-dom'
import morphdom from 'morphdom'
import { GameState } from '../../models/game'
import { Canvas } from '../canvas'

export function render (s: GameState) {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('No root element')
  }
  morphdom(root, renderState(s))
}

function renderState (s: GameState) {
  return (
    <div id="root">
      <Canvas cards={s.canvas} />
    </div>
  )
}
