import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Label, TextInput } from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string) => void
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
  handleAddBookmark,
}: PropTypes) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const handleShowAdding = () => setIsAdding(true)

  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log('submit', event.target)
    handleAddBookmark('test')
  }

  const addLinkForm = (
    <div className={styles.addLink}>
      {isAdding ? (
        <Form onSubmit={handleSubmitAdd}>
          <Label htmlFor="bookmarkUrl" className="usa-sr-only">
            URL
          </Label>
          <TextInput
            type="url"
            id="bookmarkUrl"
            name="bookmarkUrl"
            placeholder="Type or paste link..."
          />
          <Button type="submit">Add site</Button>
        </Form>
      ) : (
        <Button type="button" outline onClick={handleShowAdding}>
          + Add link
        </Button>
      )}
    </div>
  )

  return (
    <Collection title={title} footer={addLinkForm}>
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
