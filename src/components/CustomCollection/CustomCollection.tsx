import React, { useState, useRef, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import type { ObjectId } from 'bson'
import {
  Button,
  Label,
  Icon,
  ComboBox,
  ComboBoxOption,
  ComboBoxRef,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DndContext } from '@dnd-kit/core'

// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from '@hello-pangea/dnd'

import { EditableCollectionTitle } from './EditableCollectionTitle'
import { RemovableBookmark } from './RemovableBookmark'
import { CustomBookmark } from './CustomBookmark/CustomBookmark'
import styles from './CustomCollection.module.scss'

import Draggable from 'components/util/Draggable/Draggable'
import Droppable from 'components/util/Droppable/Droppable'

import Tooltip from 'components/Tooltip/Tooltip'
import Collection from 'components/Collection/Collection'
import type { MongoBookmark, WidgetType, CMSBookmark } from 'types/index'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'
import { useAnalytics } from 'stores/analyticsContext'
import { useModalContext } from 'stores/modalContext'

// TODO - refactor this component to use WidgetWithSettings

type PropTypes = {
  _id: ObjectId
  title?: string
  type?: WidgetType
  bookmarks?: MongoBookmark[]
  bookmarkOptions?: CMSBookmark[]
  handleRemoveBookmark: (_id: ObjectId, cmsId?: string) => void
  handleAddBookmark: (url: string, label?: string, cmsId?: string) => void
  handleRemoveCollection: () => void
  handleEditCollection: (title: string, bookmarks?: MongoBookmark[]) => void
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
}: PropTypes) => {
  const linkInput = useRef<ComboBoxRef>(null)

  // Contains all of the collections visible bookmarks, and the information for each bookmark when it is displayed
  // <SortableContext> needs an array of unique identifiers to sort by
  // Our bookmarks have ObjectId in `_id` which isn't a string so we make the equvalent here
  const visibleBookmarks = useMemo(
    () =>
      bookmarks
        .filter((b) => !b.isRemoved)
        .map((b) => {
          return { id: b._id.toString(), ...b }
        }),
    [bookmarks]
  )

  const removedBookmarks = useMemo(
    () => bookmarks.filter((b) => b.isRemoved),
    [bookmarks]
  )

  const [isAddingLink, setIsAddingLink] = useState<boolean>(false)
  const [isEditingTitle, setEditingTitle] = useState(false)
  const { trackEvent } = useAnalytics()
  const {
    updateModalId,
    updateModalText,
    updateWidget,
    updateCustomLinkLabel,
    isAddingLinkContext,
    modalRef,
  } = useModalContext()

  // Collection settings dropdown state
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const [customLabel, setCustomLabel] = useState<string>('')

  useEffect(() => {
    // Auto-focus on ComboBox when clicking Add Link
    if (isAddingLink && linkInput.current) {
      linkInput.current.focus()
      // Clear state in case a previously cancelled link is hanging around
      setCustomLabel('')
    }
  }, [isAddingLink])

  useEffect(() => {
    // If a modal closes, isAddingLinkContext will be set to false, which
    // will trigger this to run and close the dropdown
    if (!isAddingLinkContext && isAddingLink) {
      setIsAddingLink(false)
    }
  }, [isAddingLinkContext])

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
    updateModalId('addCustomLinkModal')
    updateModalText({
      headingText: 'Add a custom link',
    })

    updateWidget({ _id: _id, title: title, type: 'Collection' })

    updateCustomLinkLabel(customLabel, showAddWarning, isAddingLink)

    modalRef?.current?.toggleModal(undefined, true)
  }

  // Save an existing link from the ComboBox
  const handleSelectChange = (value: string | undefined) => {
    const customLink = value === 'custom'
    const existingLink =
      value && bookmarkOptions.find((i) => `${i.id}` === value)

    // If the value is 'custom', the user has selected 'Add custom link' and
    // we need to open the AddCustomLinkModal
    if (customLink) {
      openCustomLinkModal()
    }
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
  // Custom link option for the ComboBox
  const addCustomLinkOption = {
    value: 'custom',
    label: 'Add custom link',
  }

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
                options={[...urlOptions, addCustomLinkOption]}
                onChange={handleSelectChange}
                ref={linkInput}
                customFilter={{
                  filter: '.*({{query}}|custom|{{query}},custom).*',
                }}
                inputProps={{
                  required: true,
                  placeholder: 'Choose a link...',
                  onChange: (e) => {
                    setCustomLabel(e.target.value)
                  },
                }}
              />
            </div>
            {showAddWarning && (
              <Tooltip
                position="right"
                label={`You’re about to hit your link limit — each collection can only have 10 links.`}>
                <Icon.Info size={3} />
              </Tooltip>
            )}
          </div>

          <div className="usa-form__note">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
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
    updateModalId('removeCustomCollectionModal')

    updateModalText({
      headingText:
        'Are you sure you’d like to delete this collection from My Space?',
      descriptionText: 'This action cannot be undone.',
    })

    updateWidget({ _id: _id, title: title, type: 'Collection' })

    modalRef?.current?.toggleModal(undefined, true)
    setIsDropdownOpen(false)
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

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (destination) {
      let copiedBookmarks = visibleBookmarks.map(
        ({ _id, url, label, cmsId, isRemoved }) => ({
          _id,
          url,
          label,
          cmsId,
          isRemoved,
        })
      )

      const [removed] = copiedBookmarks.splice(source.index, 1)
      copiedBookmarks.splice(destination.index, 0, removed)

      if (removedBookmarks.length > 0) {
        const removedBookmarksToAddBack = removedBookmarks.map(
          ({ _id, url, label, cmsId, isRemoved }) => ({
            _id,
            url,
            label,
            cmsId,
            isRemoved,
          })
        )

        copiedBookmarks = [...copiedBookmarks, ...removedBookmarksToAddBack]
      }

      handleEditCollection(title, copiedBookmarks)
    }
  }

  const findBookmark = (bookmark: MongoBookmark) => {
    /* In order to keep urls, labels, etc related to bookmarks up-to-date, we manage them in the CMS. This 
        function looks at each bookmark in the users MySpace, uses the cmsId to find the corresponding bookmark
        that we have previously retrieved from the CMS, and that CMS bookmark is what we display. This ensures
        that users have the most accurate bookmark information. We are NOT displaying the bookmark we get from
        the db, it is merely used as a reference. */
    return bookmarkOptions.find((b) => b.id === bookmark.cmsId) as CMSBookmark
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
    </>
  )

  return (
    // handleOnDragEnd
    <DndContext>
      <Droppable dropId={_id.toString()}>
        <Collection
          header={customCollectionHeader}
          footer={!isEditingTitle ? addLinkForm : null}>
          {visibleBookmarks.map((bookmark: MongoBookmark, index) => {
            const foundBookmark = findBookmark(bookmark)
            return bookmark.cmsId && foundBookmark ? (
              <Draggable
                key={bookmark._id.toString()}
                dragId={bookmark._id.toString()}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    aria-label="Drag Handle"
                    className={styles.dragIconWrap}>
                    <FontAwesomeIcon icon="grip-vertical" />
                  </span>
                  <div className={styles.dragBookmark}>
                    <RemovableBookmark
                      key={`bookmark_${bookmark._id}`}
                      bookmark={foundBookmark}
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
                </div>
              </Draggable>
            ) : (
              <Draggable
                key={bookmark._id.toString()}
                dragId={bookmark._id.toString()}>
                <span aria-label="Drag Handle" className={styles.dragIconWrap}>
                  <FontAwesomeIcon icon="grip-vertical" />
                </span>
                <div className={styles.dragBookmark}>
                  <CustomBookmark
                    key={`bookmark_${bookmark._id}`}
                    bookmark={bookmark}
                    widgetId={_id}
                    collectionTitle={title}
                  />
                </div>
              </Draggable>
            )
          })}
          {/* {provided.placeholder} */}
        </Collection>
      </Droppable>
    </DndContext>
  )
}

export default CustomCollection
