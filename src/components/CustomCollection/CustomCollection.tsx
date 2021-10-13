import React, { useState, useRef } from 'react'
import {
  Button,
  Form,
  Label,
  ModalRef,
  ComboBox,
  ComboBoxOption,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RemovableBookmark } from './RemovableBookmark'
import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType, BookmarkRecords } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type PropTypes = {
  title: string
  bookmarks: BookmarkType[]
  bookmarkOptions?: BookmarkRecords
  handleRemoveBookmark: (id: string) => void
  handleAddBookmark: (url: string, label?: string) => void
  handleRemoveCollection: () => void
}

const CustomCollection = ({
  title,
  bookmarks,
  bookmarkOptions = [],
  handleRemoveBookmark,
  handleAddBookmark,
  handleRemoveCollection,
}: PropTypes) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const urlInputValue = useRef<string>('')
  const addCustomLinkModal = useRef<ModalRef>(null)

  const handleShowAdding = () => setIsAdding(true)

  const handleCancel = () => {
    setIsAdding(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  const selectedExistingLink = (value: string) =>
    bookmarkOptions.find((i) => i.id === value)

  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const existingLink = selectedExistingLink(urlInputValue.current)

    if (existingLink) {
      // Adding an existing link
      // TODO - ensure there is a URL value
      handleAddBookmark(existingLink.url || '', existingLink.label)
      urlInputValue.current = ''
      setIsAdding(false)
    } else {
      // TODO - validate URl here
      // Adding a custom link
      addCustomLinkModal.current?.toggleModal(undefined, true)
    }
  }

  const handleSaveBookmark = (label: string) => {
    // TODO - ensure there is a URL value
    handleAddBookmark(urlInputValue.current, label)
    urlInputValue.current = ''
    setIsAdding(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  const urlOptions = bookmarkOptions
    .filter((b) => !!b.url)
    .map(
      (b) =>
        ({
          value: b.id,
          label: b.label || b.url,
        } as ComboBoxOption)
    )

  const handleSelectChange = (value: string | undefined) => {
    urlInputValue.current = value || ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value) {
      if (urlOptions.length === bookmarkOptions.length) {
        // Add new option to end of list
        urlOptions.push({ value, label: value })
      } else {
        // Rewrite the new option
        urlOptions[urlOptions.length - 1] = { value, label: value }
      }
    }
  }

  const addLinkForm = (
    <div className={styles.addLink}>
      {isAdding ? (
        <Form onSubmit={handleSubmitAdd}>
          <Label htmlFor="bookmarkUrl" className="usa-sr-only">
            URL
          </Label>

          <ComboBox
            id="bookmarkUrl"
            name="bookmarkUrl"
            options={urlOptions}
            onChange={handleSelectChange}
            inputProps={{
              required: true,
              // type: 'url', // TODO - handle conditional validation
              onChange: handleInputChange,
              placeholder: 'Type or paste link...',
            }}
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
  const menuIcon = <FontAwesomeIcon icon="cog" />
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

  // Component and modal for Settings to pass as
  // Custom Collection header
  const customCollectionSettings = (
    <>
      <DropdownMenu
        dropdownRef={dropdownEl}
        menuIcon={menuIcon}
        ariaLabel="Collection Settings"
        onMenuClick={menuOnClick}
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
