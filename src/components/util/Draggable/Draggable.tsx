import React from 'react'
import { useDraggable } from '@dnd-kit/core'

type DraggableProps = {
  dragId: string
  children: React.ReactNode
}

const Draggable = ({ dragId, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dragId,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

export default Draggable
