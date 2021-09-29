import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
}

const UNDO_TIMEOUT = 3000 // 3 seconds

export const RemovableBookmark = ({
  bookmark,
  handleRemove,
}: {
  bookmark: BookmarkType
  handleRemove: () => void
}) => {
  const { url, label } = bookmark
  let timer: NodeJS.Timeout

  const [isHidden, setHidden] = useState<boolean>(false)

  const handleDeleteBookmark = () => {
    if (!isHidden) setHidden(true)
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
    <Bookmark href={url} onDelete={handleDeleteBookmark}>
      {label}
    </Bookmark>
  )
}

const CustomCollection = ({
  title,
  bookmarks,
  handleRemoveBookmark,
}: PropTypes) => {
  return (
    <Collection title={title}>
      {bookmarks.map((bookmark: BookmarkType) => (
        <RemovableBookmark
          key={`bookmark_${bookmark.id}`}
          bookmark={bookmark}
          handleRemove={() => handleRemoveBookmark(bookmark.id)}
        />
      ))}
    </Collection>
  )
}

export default CustomCollection
