import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './CustomCollection.module.scss'

import Bookmark from 'components/Bookmark/Bookmark'
import type { CMSBookmark } from 'types/index'

const UNDO_TIMEOUT = 3000 // 3 seconds

export const RemovableBookmark = ({
  bookmark,
  handleRemove,
}: {
  bookmark: CMSBookmark
  handleRemove: () => void
}) => {
  const { url, label } = bookmark

  let timer: NodeJS.Timeout

  const [isHidden, setHidden] = useState<boolean>(false)

  const handleDeleteBookmark = () => {
    setHidden(true)
  }

  const handleUndoDelete = () => {
    setHidden(false)
    clearTimeout(timer)
  }

  useEffect(() => {
    if (isHidden) {
      timer = setTimeout(() => {
        handleRemove()
      }, UNDO_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [isHidden])

  return isHidden ? (
    <button type="button" onClick={handleUndoDelete} className={styles.undo}>
      Undo remove <FontAwesomeIcon icon="undo-alt" />
    </button>
  ) : (
    <Bookmark
      href={url}
      label={label}
      bookmarkDescription={bookmark.description}
      onDelete={handleDeleteBookmark}>
      {label || url}
    </Bookmark>
  )
}
