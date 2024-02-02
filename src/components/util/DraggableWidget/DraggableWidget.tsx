import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMySpaceContext } from 'stores/myspaceContext'

type DraggableWidgetProps = {
  id: string
  children: React.ReactNode
}

const DraggableWidget = ({ id, children }: DraggableWidgetProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: '100%',
    height: '100%',
    zIndex: isDragging ? '100' : 'auto',
  }

  const { disableDragAndDrop } = useMySpaceContext()

  return (
    <div ref={setNodeRef} style={{ ...style }}>
      {disableDragAndDrop ? (
        <div>{children}</div>
      ) : (
        <div
          {...listeners}
          {...attributes}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default DraggableWidget
