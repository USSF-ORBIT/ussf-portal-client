import React, { createContext, useContext, useRef, useState } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { useAnalytics } from 'stores/analyticsContext'
import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useRemoveWidgetMutation } from 'operations/portal/mutations/removeWidget.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useEditBookmarkMutation } from 'operations/portal/mutations/editBookmark.g'
import { Widget, Bookmark as BookmarkType } from 'types/index'

// Try to clean this up
export type ModalContextType = {
  modalId: string
  updateModalId: (modalId: string) => void
  modalRef: React.RefObject<ModalRef> | null
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
  isAddingLink?: boolean
}

export const ModalContext = createContext<ModalContextType>({
  modalId: '',
  updateModalId: () => {
    return
  },
  modalRef: null,
  modalHeadingText: '',
  closeModal: () => {
    return
  },
  onDelete: () => {
    return
  },
  onSave: () => {
    return
  },
  updateWidget: () => {
    return
  },
  updateBookmark: () => {
    return
  },
  updateCustomLinkLabel: () => {
    return
  },
  updateModalText: () => {
    return
  },
  additionalText: '',
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalHeadingText, setModalHeadingText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  const [modalId, setModalId] = useState('')
  const [customLinkLabel, setCustomLinkLabel] = useState('')
  const [showAddWarning, setShowAddWarning] = useState(false)
  const [widgetState, setWidgetState] = useState<Widget | null>()
  const [bookmark, setBookmark] = useState<BookmarkType | null>()
  const [isAddingLink, setIsAddingLink] = useState(false)

  const modalRef = useRef<ModalRef>(null)
  const { trackEvent } = useAnalytics()

  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleRemoveWidget] = useRemoveWidgetMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleEditBookmark] = useEditBookmarkMutation()

  const closeModal = () => {
    console.log('Closing')
    setWidgetState(null)
    setBookmark(null)
    setCustomLinkLabel('')
    setModalId('')
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

    // Not sure about setting this here because it creates 2 sources of truth. Could
    // become problematic
    // setIsAddingLink(false)
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
    console.log('Hello: ', modalId)
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
    // All of these are related exclusively to adding a custom link
    setCustomLinkLabel(customLinkLabel)
    setShowAddWarning(showAddWarning)
    setIsAddingLink(isAddingLink)
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
    isAddingLink,
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
