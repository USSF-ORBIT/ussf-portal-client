import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Label,
  ModalRef,
  ComboBox,
  ComboBoxOption,
  ComboBoxRef,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditableCollectionTitle } from './EditableCollectionTitle'
import { RemovableBookmark } from './RemovableBookmark'
import { CustomBookmark } from './CustomBookmark'
import styles from './CustomCollection.module.scss'
import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType, BookmarkRecords } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type PropTypes = {
  _id: string
  title?: string
  bookmarks?: BookmarkType[]
  bookmarkOptions?: BookmarkRecords
  handleRemoveBookmark: (id: string, cmsId?: string) => void
  handleAddBookmark: (url: string, label?: string, cmsId?: string) => void
  handleRemoveCollection: () => void
  handleEditCollection: (title: string) => void
  handleEditBookmark: (id: string, url?: string, label?: string) => void
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
  handleEditBookmark,
}: PropTypes) => {
  const [isAddingLink, setIsAddingLink] = useState<boolean>(false)
  const addCustomLinkModal = useRef<ModalRef>(null)
  const linkInput = useRef<ComboBoxRef>(null)
  const [isEditingTitle, setEditingTitle] = useState(false)

  useEffect(() => {
    // Auto-focus on ComboBox when clicking Add Link
    if (isAddingLink && linkInput.current) {
      linkInput.current.focus()
    }
  }, [isAddingLink])

  useEffect(() => {
    // If there is no title, prompt user to enter one
    if (title === '') {
      setEditingTitle(true)
    }
  }, [])

  // Show the Add Link form
  const handleShowAdding = () => setIsAddingLink(true)

  // Open Add Custom Link modal
  const openCustomLinkModal = () => {
    addCustomLinkModal.current?.toggleModal(undefined, true)
  }

  // Cancel out of Add Custom Link modal
  const handleCancel = () => {
    setIsAddingLink(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  // Save a custom link from the modal
  const handleSaveCustomLink = (url: string, label: string) => {
    handleAddBookmark(url, label)
    setIsAddingLink(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  // Save an existing link from the ComboBox
  const handleSelectChange = (value: string | undefined) => {
    const existingLink =
      value && bookmarkOptions.find((i) => `${i.id}` === value)

    if (existingLink) {
      handleAddBookmark(
        existingLink.url || '',
        existingLink.label,
        existingLink.id
      )
      setIsAddingLink(false)
    }
  }

  // Map CMS link options to ComboBox options
  const urlOptions = bookmarkOptions
    .filter((b) => !!b.url)
    .map(
      (b) =>
        ({
          value: `${b.id}`,
          label: b.label || b.url,
        } as ComboBoxOption)
    )

  const addLinkForm = (
    <div className={styles.addLink}>
      {isAddingLink ? (
        <>
          <Label htmlFor="bookmarkId" className="usa-sr-only">
            Select existing link
          </Label>

          <ComboBox
            id="bookmarkId"
            name="bookmarkId"
            className={styles.addLinkComboBox}
            options={urlOptions}
            onChange={handleSelectChange}
            ref={linkInput}
            inputProps={{
              required: true,
              placeholder: 'Type or paste link...',
            }}
          />
          <p className="usa-form__note">
            Don’t see what you need?
            <br />
            <Button type="button" unstyled onClick={openCustomLinkModal}>
              Add a custom link
            </Button>
          </p>
        </>
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
  const deleteCustomCollection = (
    <Button
      type="button"
      className={styles.collectionSettingsDropdown}
      onClick={handleShowRemove}>
      Delete this collection
    </Button>
  )

  const editCustomCollectionTitle = (
    <Button
      type="button"
      className={styles.collectionSettingsDropdown}
      onClick={() => {
        setEditingTitle(true)
        setIsDropdownOpen(false)
      }}>
      Edit collection title
    </Button>
  )
  const customCollectionDropdownItems = (
    <>
      <ol>
        <li>{editCustomCollectionTitle}</li>
        <li>{deleteCustomCollection}</li>
      </ol>
    </>
  )

  const handleCancelEdit = () => {
    // If the user cancels editing, reset the form and do not save changes
    // If there is no previous input value, remove the collection
    if (title === '') {
      handleRemoveCollection()
    }
    setEditingTitle(false)
  }

  const customCollectionHeader = (
    <>
      <EditableCollectionTitle
        collectionId={_id}
        text={title}
        onSave={(newTitle) => {
          setEditingTitle(false)
          handleEditCollection(newTitle)
        }}
        onCancel={handleCancelEdit}
        isEditing={isEditingTitle}
      />
      {!isEditingTitle && (
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
          {customCollectionDropdownItems}
        </DropdownMenu>
      )}
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
        header={customCollectionHeader}
        footer={!isEditingTitle ? addLinkForm : null}>
        {bookmarks
          .filter((b: BookmarkType) => !b.isRemoved)
          .map((bookmark: BookmarkType) =>
            bookmark.cmsId ? (
              <RemovableBookmark
                key={`bookmark_${bookmark._id}`}
                bookmark={bookmark}
                handleRemove={() =>
                  handleRemoveBookmark(`${bookmark._id}`, bookmark.cmsId)
                }
              />
            ) : (
              <CustomBookmark
                key={`bookmark_${bookmark._id}`}
                bookmark={bookmark}
                onSave={(label, url) => {
                  handleEditBookmark(bookmark._id, url, label)
                }}
                onDelete={() => handleRemoveBookmark(`${bookmark._id}`)}
              />
            )
          )}
      </Collection>
      <AddCustomLinkModal
        modalRef={addCustomLinkModal}
        onCancel={handleCancel}
        onSave={handleSaveCustomLink}
      />
    </>
  )
}

export default CustomCollection
