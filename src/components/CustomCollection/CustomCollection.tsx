import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import type { ObjectId } from 'bson'
import {
  Button,
  Label,
  ModalRef,
  ComboBox,
  ComboBoxOption,
  ComboBoxRef,
  IconInfo,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditableCollectionTitle } from './EditableCollectionTitle'
import { RemovableBookmark } from './RemovableBookmark'
import { CustomBookmark } from './CustomBookmark'
import styles from './CustomCollection.module.scss'

import Tooltip from 'components/Tooltip/Tooltip'
import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType, BookmarkRecords } from 'types/index'
import AddCustomLinkModal from 'components/modals/AddCustomLinkModal'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import RemoveCustomCollectionModal from 'components/modals/RemoveCustomCollectionModal'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'
import { useAnalytics } from 'stores/analyticsContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// TODO - refactor this component to use WidgetWithSettings

type PropTypes = {
  _id: ObjectId
  title?: string
  bookmarks?: BookmarkType[]
  bookmarkOptions?: BookmarkRecords
  handleRemoveBookmark: (_id: ObjectId, cmsId?: string) => void
  handleAddBookmark: (url: string, label?: string, cmsId?: string) => void
  handleRemoveCollection: () => void
  handleEditCollection: (title: string) => void
  handleEditBookmark: (_id: ObjectId, url?: string, label?: string) => void
}

const MAXIMUM_BOOKMARKS_PER_COLLECTION = 10

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
  const addCustomLinkModal = useRef<ModalRef>(null)
  const deleteCollectionModal = useRef<ModalRef>(null)
  const linkInput = useRef<ComboBoxRef>(null)

  const [isAddingLink, setIsAddingLink] = useState<boolean>(false)
  const [isEditingTitle, setEditingTitle] = useState(false)
  const { trackEvent } = useAnalytics()

  // Collection settings dropdown state
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const visibleBookmarks = bookmarks.filter((b) => !b.isRemoved)
  const [allBookmarks, setBookmarks] = useState(visibleBookmarks)

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

  /** Add Link handlers */

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
    trackEvent('Add link', 'Save custom link', `${title} / ${label} / ${url}`)
    handleAddBookmark(url, label)
    setIsAddingLink(false)
    addCustomLinkModal.current?.toggleModal(undefined, false)
  }

  // Save an existing link from the ComboBox
  const handleSelectChange = (value: string | undefined) => {
    const existingLink =
      value && bookmarkOptions.find((i) => `${i.id}` === value)

    if (existingLink) {
      trackEvent(
        'Add link',
        'Save CMS link',
        `${title} / ${existingLink.label || existingLink.url}`
      )
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

  const canAddLink = visibleBookmarks.length < MAXIMUM_BOOKMARKS_PER_COLLECTION
  const showAddWarning =
    visibleBookmarks.length === MAXIMUM_BOOKMARKS_PER_COLLECTION - 1

  const addLinkFormClasses = classnames(styles.addLink, {
    [styles.addLinkWarning]: showAddWarning,
  })

  const addLinkForm = canAddLink && (
    <div className={addLinkFormClasses}>
      {isAddingLink ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div style={{ width: '100%' }}>
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
                  placeholder: 'Choose a link...',
                }}
              />
            </div>
            {showAddWarning && (
              <Tooltip
                position="right"
                label={`You’re about to hit your link limit — each collection can only have 10 links.`}>
                <IconInfo size={3} />
              </Tooltip>
            )}
          </div>

          <div className="usa-form__note">
            Don’t see what you need?
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Button type="button" unstyled onClick={openCustomLinkModal}>
                Add a custom link
              </Button>
              <Button
                type="button"
                unstyled
                onClick={() => setIsAddingLink(false)}>
                Cancel
              </Button>
            </div>
          </div>
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

  /* Collection settings handlers */
  // Toggle the dropdown menu
  const menuOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  /** Delete collection */
  // Show confirmation before deleting a collection
  const handleConfirmDeleteCollection = () => {
    deleteCollectionModal.current?.toggleModal(undefined, true)
    setIsDropdownOpen(false)
  }

  // After confirming delete, trigger the mutation and close the modal
  const handleDeleteCollection = () => {
    trackEvent('Collection settings', 'Delete collection', title)
    handleRemoveCollection()
    deleteCollectionModal.current?.toggleModal(undefined, false)
  }

  // Cancel deleting a collection
  const handleCancelDeleteCollection = () => {
    deleteCollectionModal.current?.toggleModal(undefined, false)
  }

  /** Edit collection */
  // Edit the collection title
  const handleEditCollectionTitle = () => {
    setEditingTitle(true)
    setIsDropdownOpen(false)
  }

  // Save the collection title
  const handleSaveCollectionTitle = (newTitle: string) => {
    setEditingTitle(false)
    trackEvent('Collection settings', 'Edit collection title')
    handleEditCollection(newTitle)
  }

  // Cancel editing the collection title
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
        onSave={handleSaveCollectionTitle}
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
          <Button
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleEditCollectionTitle}>
            Edit collection title
          </Button>
          <Button
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmDeleteCollection}>
            Delete this collection
          </Button>
        </DropdownMenu>
      )}
      <RemoveCustomCollectionModal
        modalRef={deleteCollectionModal}
        onCancel={handleCancelDeleteCollection}
        onDelete={handleDeleteCollection}
      />
    </>
  )

  return (
    <DragDropContext onDragEnd={() => console.log('DONE DRAGGING')}>
      <Droppable droppableId="drop-test">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Collection
              header={customCollectionHeader}
              footer={!isEditingTitle ? addLinkForm : null}>
              {allBookmarks.map((bookmark: BookmarkType, index) =>
                bookmark.cmsId ? (
                  <Draggable
                    draggableId={bookmark.url}
                    index={index}
                    key={bookmark.cmsId}>
                    {(provided) => {
                      // Overriding styles for element containing draggableProps
                      const style = {
                        display: 'flex',
                        alignItems: 'center',
                        ...provided.draggableProps.style,
                      }

                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={style}>
                          <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon="grip-vertical"
                              style={{
                                color: '#A0A8B6',
                                marginRight: '10px',
                                marginBottom: '2px',
                              }}
                            />
                          </span>
                          <RemovableBookmark
                            key={`bookmark_${bookmark._id}`}
                            bookmark={bookmark}
                            handleRemove={() => {
                              trackEvent(
                                'Remove link',
                                'Hide CMS link',
                                `${title} / ${bookmark.label || bookmark.url}`
                              )
                              handleRemoveBookmark(bookmark._id, bookmark.cmsId)
                            }}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                ) : (
                  <Draggable
                    draggableId={bookmark.url}
                    index={index}
                    key={bookmark._id.toString()}>
                    {(provided) => {
                      // Overriding styles for element containing draggableProps
                      const style = {
                        display: 'flex',
                        alignItems: 'center',
                        ...provided.draggableProps.style,
                      }

                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={style}>
                          <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon="grip-vertical"
                              style={{
                                color: '#A0A8B6',
                                marginRight: '10px',
                                marginBottom: '2px',
                              }}
                            />
                          </span>
                          <CustomBookmark
                            key={`bookmark_${bookmark._id}`}
                            bookmark={bookmark}
                            onSave={(label, url) => {
                              handleEditBookmark(bookmark._id, url, label)
                            }}
                            onDelete={() => handleRemoveBookmark(bookmark._id)}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                )
              )}
            </Collection>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCustomLinkModal
        modalRef={addCustomLinkModal}
        onCancel={handleCancel}
        onSave={handleSaveCustomLink}
        showAddWarning={showAddWarning}
      />
    </DragDropContext>
  )
}

export default CustomCollection
