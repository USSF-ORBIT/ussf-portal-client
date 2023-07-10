import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DraggableBookmark.module.scss'

type DraggableBookmarkProps = {
  id: string
  children: React.ReactNode
}

const DraggableBookmark = ({ id, children }: DraggableBookmarkProps) => {
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

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, display: 'flex', alignItems: 'center' }}>
      <span
        aria-label="Drag Handle"
        className={styles.dragIconWrap}
        {...listeners}
        {...attributes}>
        <FontAwesomeIcon icon="grip-vertical" />
      </span>
      <div className={styles.dragBookmark}>{children}</div>
    </div>
  )
}

export default DraggableBookmark
