import React, { createContext, useContext, useRef, useState } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { useAnalytics } from 'stores/analyticsContext'
import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useRemoveWidgetMutation } from 'operations/portal/mutations/removeWidget.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useEditBookmarkMutation } from 'operations/portal/mutations/editBookmark.g'
import { Widget, Bookmark as BookmarkType } from 'types/index'

// TO DO - A few things...
// 1. Find a way to use callbacks for the handlers in this file (e.g. handleSaveCustomLink). We want
// to have that logic originate from the component that is calling to open a modal, if we can.
// 2. Refactor the various useState calls in ModalProvider. A lot of them could be consolidated into
// a larger state object. Example: modalHeadingText, additionalText, and modalId could all be combined
// into one state object, and as a result, each of their respective  handler functions could be combined into one as well.
// 3. Refactor ModalContextType to match updates mentioned in the above point.

// modalRef had to be given an 'any' type, else it would cause
// a ton of tests to fail. The mocked ref that is causing the issue
// is in testHelpers.tsx on line 11.
export type ModalContextType = {
  modalId: string
  updateModalId: (modalId: string) => void
  modalRef: React.RefObject<ModalRef> | null | any
  modalHeadingText: string
  closeModal: () => void
  onDelete: () => void
  onSave: (url: string, label: string) => void
  updateWidget: (widget: Widget) => void
  updateModalText: ({
    headingText,
    descriptionText,
  }: {
    headingText: string
    descriptionText?: string
  }) => void
  additionalText?: string
  bookmark?: BookmarkType | null
  updateBookmark: (bookmark: BookmarkType) => void
  customLinkLabel?: string
  updateCustomLinkLabel: (
    customLinkLabel: string,
    showAddWarning: boolean,
    isAddingLink: boolean
  ) => void
  showAddWarning?: boolean
  isAddingLinkContext: boolean
}

export const ModalContext = createContext<ModalContextType>({
  modalId: '',
  updateModalId: /* istanbul ignore next */ () => {
    return
  },
  modalRef: null,
  modalHeadingText: '',
  closeModal: /* istanbul ignore next */ () => {
    return
  },
  onDelete: /* istanbul ignore next */ () => {
    return
  },
  onSave: /* istanbul ignore next */ () => {
    return
  },
  updateWidget: /* istanbul ignore next */ () => {
    return
  },
  updateBookmark: /* istanbul ignore next */ () => {
    return
  },
  updateCustomLinkLabel: /* istanbul ignore next */ () => {
    return
  },
  updateModalText: /* istanbul ignore next */ () => {
    return
  },
  additionalText: '',
  isAddingLinkContext: false,
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalHeadingText, setModalHeadingText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  const [modalId, setModalId] = useState('')
  const [customLinkLabel, setCustomLinkLabel] = useState('')
  const [showAddWarning, setShowAddWarning] = useState(false)
  const [widgetState, setWidgetState] = useState<Widget | null>()
  const [bookmark, setBookmark] = useState<BookmarkType | null>()

  // In CustomCollection.tsx there is an isAddingLink state that controls
  // the visibility of a dropdown. isAddingLinkContext mirrors that value,
  // and is evaluated in a useEffect to close the dropdown if a modal is closed.
  const [isAddingLinkContext, setIsAddingLinkContext] = useState(false)

  const modalRef = useRef<ModalRef>(null)
  const { trackEvent } = useAnalytics()

  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleRemoveWidget] = useRemoveWidgetMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleEditBookmark] = useEditBookmarkMutation()

  const closeModal = () => {
    setWidgetState(null)
    setBookmark(null)
    setCustomLinkLabel('')
    setModalId('')
    if (isAddingLinkContext) {
      setIsAddingLinkContext(false)
    }
    modalRef.current?.toggleModal(undefined, false)
  }

  const updateModalText = ({
    headingText,
    descriptionText = '',
  }: {
    headingText: string
    descriptionText?: string
  }) => {
    setModalHeadingText(headingText)
    setAdditionalText(descriptionText)
  }

  const handleSaveCustomLink = (url: string, label: string) => {
    trackEvent(
      'Add link',
      'Save custom link',
      `${widgetState?.title} / ${label} / ${url}`
    )
    handleAddBookmark({
      variables: {
        collectionId: widgetState?._id,
        url,
        label,
      },
      refetchQueries: [`getMySpace`],
    })

    closeModal()
  }

  const handleEditCustomLink = (url: string, label: string) => {
    handleEditBookmark({
      variables: {
        _id: bookmark?._id,
        collectionId: widgetState?._id,
        url,
        label,
      },
      refetchQueries: [`getMySpace`],
    })
    closeModal()
  }

  const updateModalId = (modalId: string) => {
    setModalId(modalId)
  }

  const updateWidget = (widget: Widget) => {
    setWidgetState(widget)
  }

  const updateBookmark = (bookmark: BookmarkType) => {
    setBookmark(bookmark)
  }

  const updateCustomLinkLabel = (
    customLinkLabel: string,
    showAddWarning = false,
    isAddingLink = false
  ) => {
    setCustomLinkLabel(customLinkLabel)
    setShowAddWarning(showAddWarning)
    setIsAddingLinkContext(isAddingLink)
  }

  const onDelete = () => {
    switch (modalId) {
      case 'removeSectionModal':
        trackEvent('Section settings', 'Remove this section', 'News')
        handleRemoveWidget({
          variables: { _id: widgetState?._id },
          refetchQueries: [`getMySpace`],
        })
        closeModal()
        break
      case 'removeCustomCollectionModal':
        trackEvent(
          'Collection settings',
          'Delete collection',
          widgetState?.title
        )
        handleRemoveCollection({
          variables: {
            _id: widgetState?._id,
          },
          refetchQueries: [`getMySpace`],
        })
        closeModal()
        break
      case 'editCustomLinkModal':
        handleRemoveBookmark({
          variables: {
            _id: bookmark?._id,
            collectionId: widgetState?._id,
          },
          refetchQueries: [`getMySpace`],
        })
        closeModal()
        break
      default:
        return null
    }
  }

  const context = {
    modalId: '',
    updateModalId,
    modalRef,
    modalHeadingText,
    closeModal,
    onDelete,
    updateWidget,
    updateModalText,
    additionalText,
    customLinkLabel,
    updateCustomLinkLabel,
    showAddWarning,
    isAddingLinkContext,
    onSave:
      modalId === 'addCustomLinkModal'
        ? handleSaveCustomLink
        : handleEditCustomLink,
    bookmark,
    updateBookmark,
  }

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}