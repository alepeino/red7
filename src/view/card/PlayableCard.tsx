import get from 'lodash/fp/get'
import set from 'lodash/fp/set'
import React from 'react'
import { useDrag } from 'react-dnd'
import { Card as CardModel } from '../../models/card'
import { dispatch } from '../../state'
import { playToCanvas } from '../../state/actions'
import { CANVAS_DROP_RESULT } from '../canvas'
import { Card, CARD_DRAG_TYPE } from './index'

type DroppableCard = CardModel & { type: string }

const PlayableCard: React.FC<{ card: CardModel }> = ({ card }) => {
  const [{ isDragging }, drag] = useDrag({
    item: set<DroppableCard>('type', CARD_DRAG_TYPE, card),
    end: (droppedCard: DroppableCard | undefined, monitor) => {
      if (droppedCard && monitor.didDrop()) {
        switch (get('type', monitor.getDropResult())) {
          case CANVAS_DROP_RESULT.type:
            return dispatch(playToCanvas(droppedCard))
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return <Card card={card} highlight={isDragging} ref={drag} />
}

export { PlayableCard }
