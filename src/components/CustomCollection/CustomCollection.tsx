import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Form,
  Label,
  ModalRef,
  ComboBox,
  ComboBoxOption,
  ComboBoxRef,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditableCollectionTitle } from './EditableCollectionTitle'
import { RemovableBookmark } from './RemovableBookmark'
import styles from './CustomCollection.module.scss'

import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType, BookmarkRecords } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

// Not an ideal way to validate URLs but this will work for now
const VALID_URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/

type PropTypes = {
  _id: string
  title?: string
  bookmarks?: BookmarkType[]
  bookmarkOptions?: BookmarkRecords
  handleRemoveBookmark: (id: string, cmsId?: string) => void
  handleAddBookmark: (url: string, label?: string, cmsId?: string) => void
  handleRemoveCollection: () => void
  handleEditCollection: (title: string) => void
}

const CustomCollection = ({
  _id,
  title = '',
  bookmarks = [],
  bookmarkOptions = [],
  handleRemoveBookmark,
  handleAddBookmark,
  handleRemoveCollection,
  handleEditCollection,
}: PropTypes) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const urlInputValue = useRef<string>('')
  const addCustomLinkModal = useRef<ModalRef>(null)
  const linkInput = useRef<ComboBoxRef>(null)

  useEffect(() => {
    if (isAdding && linkInput.current) {
      linkInput.current.focus()
    }
  }, [isAdding])

  const handleShowAdding = () => setIsAdding(true)

  const handleCancel = () => {
    setIsAdding(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  const selectedExistingLink = (value: string) =>
    bookmarkOptions.find((i) => `${i.id}` === value)

  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const existingLink = selectedExistingLink(urlInputValue.current)

    if (existingLink) {
      // Adding an existing link
      // TODO - ensure there is a URL value
      handleAddBookmark(
        existingLink.url || '',
        existingLink.label,
        existingLink.id
      )
      urlInputValue.current = ''
      setIsAdding(false)
    } else {
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
          value: `${b.id}`,
          label: b.label || b.url,
        } as ComboBoxOption)
    )

  const handleSelectChange = (value: string | undefined) => {
    const existingLink = value && selectedExistingLink(value)
    const enteredCustomLink = urlOptions.length !== bookmarkOptions.length

    if (existingLink && enteredCustomLink) {
      // Remove entered custom link
      urlOptions.pop()
      // Reset input validation
      const inputEl = document.getElementById('bookmarkUrl') as HTMLInputElement
      inputEl?.setCustomValidity('')
      inputEl?.reportValidity()
    }

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

    if (VALID_URL_REGEX.test(value)) {
      // valid
      e.target.setCustomValidity('')
    } else {
      // invalid
      e.target.setCustomValidity(
        'Please enter a valid URL, starting with http:// or https://'
      )
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
            ref={linkInput}
            inputProps={{
              required: true,
              onChange: handleInputChange,
              placeholder: 'Type or paste link...',
            }}
          />
          <Button type="submit">Add site</Button>
        </Form>
      ) : (
        <Button
          type="button"
          className={styles.addLinkButton}
          outline
          onClick={handleShowAdding}>
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
        collectionId={_id}
        text={title}
        onSave={handleEditCollection}
        onDelete={handleRemoveCollection}
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
        align="right"
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
      <Collection header={customCollectionHeader} footer={addLinkForm}>
        {bookmarks
          .filter((b: BookmarkType) => !b.isRemoved)
          .map((bookmark: BookmarkType) => (
            <RemovableBookmark
              key={`bookmark_${bookmark._id}`}
              bookmark={bookmark}
              handleRemove={() =>
                handleRemoveBookmark(`${bookmark._id}`, bookmark.cmsId)
              }
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
