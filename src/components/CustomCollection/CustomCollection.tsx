import React, { useState, useRef } from 'react'
import {
  Button,
  Form,
  Label,
  TextInput,
  ModalRef,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditableCollectionTitle } from './EditableCollectionTitle'
import { RemovableBookmark } from './RemovableBookmark'
import styles from './CustomCollection.module.scss'
import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string, label?: string) => void
  handleRemoveCollection: () => void
  handleEditCollection: (title: string) => void
}

const CustomCollection = ({
  title,
  bookmarks,
  handleRemoveBookmark,
  handleAddBookmark,
  handleRemoveCollection,
  handleEditCollection,
}: PropTypes) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const urlInputValue = useRef<string>('')
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
    handleAddBookmark(urlInputValue.current, label)
    urlInputValue.current = ''

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
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )
  // Initialize hook for delete confirmation modal
  const deleteCollectionModal = useRef<ModalRef>(null)
  // Menu button and its togglefunction
  const menuOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  // Before deleting the collection, show confirmation modal
  // and close the dropdown menu
  const handleShowRemove = () => {
    deleteCollectionModal.current?.toggleModal(undefined, true)
    setIsDropdownOpen(false)
  }
  // After confirming delete, trigger the mutation and close the modal
  const handleDeleteCollection = () => {
    handleRemoveCollection()
    deleteCollectionModal.current?.toggleModal(undefined, false)
  }

  const handleCancelCollection = () => {
    deleteCollectionModal.current?.toggleModal(undefined, false)
  }
  // Items to populate dropdown menu
  const editCustomCollectionItem = (
    <>
      <Button
        type="button"
        className={styles.collectionSettingsDropdown}
        onClick={handleShowRemove}>
        Delete Collection
      </Button>
    </>
  )

  const customCollectionHeader = (
    <>
      <EditableCollectionTitle
        text={title}
        placeholder={'Add a title for this collection'}
        onSave={handleEditCollection}
      />

      <DropdownMenu
        toggleEl={
          <button
            type="button"
            className={styles.dropdownMenuToggle}
            onClick={menuOnClick}
            aria-label="Collection Settings">
            <FontAwesomeIcon icon="cog" />
          </button>
        }
        dropdownRef={dropdownEl}
        isActive={isDropdownOpen}>
        {editCustomCollectionItem}
      </DropdownMenu>
      <RemoveCustomCollectionModal
        modalRef={deleteCollectionModal}
        onCancel={handleCancelCollection}
        onDelete={handleDeleteCollection}
      />
    </>
  )

  return (
    <>
      <Collection
        // title={title} -- if the title is our editable input, can we make title optional here?
        header={customCollectionHeader}
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
