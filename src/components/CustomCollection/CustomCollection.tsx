import React, { useState, useRef } from 'react'
import {
  Button,
  Form,
  Label,
  TextInput,
  useModal,
} from '@trussworks/react-uswds'

import { RemovableBookmark } from './RemovableBookmark'
import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string, label?: string) => void
}

const CustomCollection = ({
  title,
  bookmarks,
  handleRemoveBookmark,
  handleAddBookmark,
}: PropTypes) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const urlInputValue = useRef<string>()
  const { isOpen, openModal, closeModal } = useModal()

  const handleShowAdding = () => setIsAdding(true)

  const handleCancel = () => {
    setIsAdding(false)
    closeModal()
  }

  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const url = `${data.get('bookmarkUrl')}`
    urlInputValue.current = url

    openModal()
  }

  const handleSaveBookmark = (label: string) => {
    if (urlInputValue.current) {
      handleAddBookmark(urlInputValue.current, label)
      urlInputValue.current = ''
    } else {
      // need a URL value
    }

    setIsAdding(false)
    closeModal()
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
            required
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
    <>
      <Collection title={title} footer={addLinkForm}>
        {bookmarks.map((bookmark: BookmarkType) => (
          <RemovableBookmark
            key={`bookmark_${bookmark.id}`}
            bookmark={bookmark}
            handleRemove={() => handleRemoveBookmark(bookmark.id)}
          />
        ))}
      </Collection>

      <AddCustomLinkModal
        isOpen={isOpen}
        onCancel={handleCancel}
        onSave={handleSaveBookmark}
        closeModal={closeModal}
      />
    </>
  )
}

export default CustomCollection
