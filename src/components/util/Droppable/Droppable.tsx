import React from 'react'
import { useDroppable } from '@dnd-kit/core'

type DroppableProps = {
  dropId: string
  children: React.ReactNode
}

const Droppable = ({ dropId, children }: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id: dropId,
  })

  return <div ref={setNodeRef}>{children}</div>
}

export default Droppable
