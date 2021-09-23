import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'

type PropTypes = {
  title: string
  id: string
  bookmarks: BookmarkType[]
}

const UNDO_TIMEOUT = 3000 // 3 seconds

const RemovableBookmark = ({
  bookmark,
  collectionId,
}: {
  bookmark: BookmarkType
  collectionId: string
}) => {
  const [handleRemoveBookmark, { data, loading, error }] =
    useRemoveBookmarkMutation()

  const { id, url, label } = bookmark
  let timer: NodeJS.Timeout

  const [isHidden, setHidden] = useState<boolean>(false)

  const handleDeleteBookmark = (id: string) => {
    if (!isHidden) setHidden(true)
  }

  const handleUndoDelete = () => {
    setHidden(false)
    clearTimeout(timer)
  }

  useEffect(() => {
    if (isHidden) {
      timer = setTimeout(() => {
        // TODO - api
        // console.log('FINISH REMOVE')
        handleRemoveBookmark({ variables: { id, collectionId } })
      }, UNDO_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [isHidden])

  return isHidden ? (
    <button type="button" onClick={handleUndoDelete} className={styles.undo}>
      Undo remove <FontAwesomeIcon icon="undo-alt" />
    </button>
  ) : (
    <Bookmark href={url} onDelete={() => handleDeleteBookmark(id)}>
      {label}
    </Bookmark>
  )
}

const CustomCollection = ({ title, id, bookmarks }: PropTypes) => {
  return (
    <Collection title={title}>
      {bookmarks.map((bookmark: BookmarkType) => (
        <RemovableBookmark
          key={`bookmark_${bookmark.id}`}
          bookmark={bookmark}
          collectionId={id}
        />
      ))}
    </Collection>
  )
}

export default CustomCollection
