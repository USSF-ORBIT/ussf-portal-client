import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Form,
  Label,
  TextInput,
  useModal,
} from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useDetectOutsideClick } from 'useDetectOutsideClick'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string, label?: string) => void
  handleRemoveCollection: () => void
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
      {label || url}
    </Bookmark>
  )
}

const CustomCollection = ({
  title,
  bookmarks,
  handleRemoveBookmark,
  handleAddBookmark,
  handleRemoveCollection,
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
      setIsAdding(false)
      closeModal()
    } else {
      // need a URL value
    }
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
          <AddCustomLinkModal
            isOpen={isOpen}
            onCancel={handleCancel}
            onSave={handleSaveBookmark}
            closeModal={closeModal}
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

  // Dropdown Menu for Collection Settings //
  // Track whether the settings dropdown should be open or closed
  // #TODO: Fix this; currently breaks opening/closing modal
  const node = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useDetectOutsideClick(node, false)
  const deleteCollectionModal = useModal()

  const menuOnClick = () => {
    setIsActive(!isActive)
  }

  const handleShowRemove = () => {
    deleteCollectionModal.openModal()
    setIsActive(false)
  }
  const editCustomCollectionItem = (
    <>
      <Button
        type="button"
        className={styles.unstyled}
        onClick={handleShowRemove}>
        Delete Collection
      </Button>
    </>
  )

  const menuIcon = <FontAwesomeIcon icon="cog" />

  const editCustomCollection = (
    <div>
      <DropdownMenu
        menuIcon={menuIcon}
        ariaLabel="Edit this collection"
        onMenuClick={menuOnClick}
        isActive={isActive}
        ref={node}>
        {editCustomCollectionItem}
      </DropdownMenu>
      <RemoveCustomCollectionModal
        isOpen={deleteCollectionModal.isOpen}
        onCancel={deleteCollectionModal.closeModal}
        onDelete={handleRemoveCollection}
        closeModal={deleteCollectionModal.closeModal}
      />
    </div>
  )

  // End Dropdown Menu for Collection Settings //

  return (
    <Collection
      title={title}
      header={editCustomCollection}
      footer={addLinkForm}>
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
