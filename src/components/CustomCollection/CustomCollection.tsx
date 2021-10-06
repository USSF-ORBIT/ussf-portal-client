import React, { useState, useRef } from 'react'
import {
  Button,
  Form,
  Label,
  TextInput,
  ModalRef,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RemovableBookmark } from './RemovableBookmark'
import styles from './CustomCollection.module.scss'
import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string, label?: string) => void
  handleRemoveCollection: () => void
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
  const addCustomLinkModal = useRef<ModalRef>(null)

  const handleShowAdding = () => setIsAdding(true)

  const handleCancel = () => {
    setIsAdding(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const url = `${data.get('bookmarkUrl')}`
    urlInputValue.current = url

    addCustomLinkModal.current?.toggleModal(undefined, true)
  }

  const handleSaveBookmark = (label: string) => {
    if (urlInputValue.current) {
      handleAddBookmark(urlInputValue.current, label)
      urlInputValue.current = ''
    } else {
      // need a URL value
    }

    setIsAdding(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
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

  /* Custom Collection Settings Menu */

  // Track whether the settings dropdown should be open or closed
  const node = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useDetectOutsideClick(node, false)
  // Initialize hook for delete confirmation modal
  const deleteCollectionModal = useRef<ModalRef>(null)
  // Menu button and its togglefunction
  const menuIcon = <FontAwesomeIcon icon="cog" />
  const menuOnClick = () => {
    setIsActive(!isActive)
  }
  // Before deleting the collection, show confirmation modal
  // and close the dropdown menu
  const handleShowRemove = () => {
    deleteCollectionModal.current?.toggleModal(undefined, true)
    setIsActive(false)
  }
  const handleCancelCollection = () => {
    setIsAdding(false)
    deleteCollectionModal.current?.toggleModal(undefined, false)
  }
  // Items to populate dropdown menu
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

  // Component and modal for Settings to pass as
  // Custom Collection header
  const customCollectionSettings = (
    <>
      <DropdownMenu
        dropdownRef={node}
        menuIcon={menuIcon}
        ariaLabel="Edit this collection"
        onMenuClick={menuOnClick}
        isActive={isActive}>
        {editCustomCollectionItem}
      </DropdownMenu>
      <RemoveCustomCollectionModal
        modalRef={deleteCollectionModal}
        onCancel={handleCancelCollection}
        onDelete={handleRemoveCollection}
      />
    </>
  )

  return (
    <>
      <Collection
        title={title}
        header={customCollectionSettings}
        footer={addLinkForm}>
        {bookmarks.map((bookmark: BookmarkType) => (
          <RemovableBookmark
            key={`bookmark_${bookmark.id}`}
            bookmark={bookmark}
            handleRemove={() => handleRemoveBookmark(bookmark.id)}
          />
        ))}
      </Collection>

      <AddCustomLinkModal
        modalRef={addCustomLinkModal}
        onCancel={handleCancel}
        onSave={handleSaveBookmark}
      />
    </>
  )
}

export default CustomCollection
