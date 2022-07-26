import classNames from 'classnames'
import * as React from 'react'

const Dashboard: React.FC<{
  activePlayer: boolean
  canPlayToPalette: boolean
  canPlayToCanvas: boolean
}> = ({ activePlayer, canPlayToCanvas, canPlayToPalette }) => (
  <div className="bg-white h-full rounded-sm p-1 flex flex-col space-y-2">
    <span
      className={classNames(
        'flex-1 text-center text-teal-700',
        canPlayToPalette ? 'bg-gray-200' : 'bg-gray-400',
        canPlayToPalette || 'line-through'
      )}
    >
      Play card to Palette
    </span>
    <span className={classNames(
      'flex-1 text-center text-pink-700',
      canPlayToCanvas ? 'bg-gray-200' : 'bg-gray-400',
      canPlayToCanvas || 'line-through'
    )}>
      Play card to Canvas
    </span>
    <button className="flex-1">Pass</button>
  </div>
)

export { Dashboard }
