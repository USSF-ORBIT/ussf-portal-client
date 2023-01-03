import React, { createContext, useContext, useRef, useState } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { useAnalytics } from 'stores/analyticsContext'
import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useRemoveWidgetMutation } from 'operations/portal/mutations/removeWidget.g'
import { Widget, Bookmark as BookmarkType } from 'types/index'

// Try to clean this up
type ModalContextType = {
  modalId: string
  updateModalId: (modalId: string) => void
  modalRef: React.RefObject<ModalRef> | null
  modalHeadingText: string
  closeModal: () => void
  onDelete: () => void
  onSave?: () => void
  updateWidget: (widget: Widget) => void
  updateModalText: ({
    headingText,
    descriptionText,
  }: {
    headingText: string
    descriptionText?: string
  }) => void
  additionalText?: string
  bookmark?: BookmarkType
  customLinkLabel?: string
  updateCustomLinkLabel?: (
    customLinkLabel: string,
    showAddWarning: boolean,
    isAddingLink: boolean
  ) => void
  showAddWarning?: boolean
  isAddingLink?: boolean
}

const ModalContext = createContext<ModalContextType>({
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
  updateWidget: () => {
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
  const [widgetState, setWidgetState] = useState()
  const [isAddingLink, setIsAddingLink] = useState(false)

  // const [bookmarkObj, setBookmarkObj] = useState({})
  const modalRef = useRef<ModalRef>(null)
  const { trackEvent } = useAnalytics()

  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleRemoveWidget] = useRemoveWidgetMutation()

  const closeModal = () => {
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

  const handleRemoveSection = () => {
    trackEvent('Section settings', 'Remove this section', 'News')
    handleRemoveWidget({
      variables: { _id: widgetState.widget._id },
      refetchQueries: [`getMySpace`],
    })

    // Clear out widgetState

    closeModal()
  }

  const handleDeleteCollection = () => {
    trackEvent('Collection settings', 'Delete collection', widgetState.title)
    handleRemoveCollection({
      variables: {
        _id: widgetState._id,
      },
      refetchQueries: [`getMySpace`],
    })

    // Clear out widgetState

    closeModal()
  }

  const handleSaveCustomLink = (url: string, label: string) => {
    trackEvent(
      'Add link',
      'Save custom link',
      `${widgetState.title} / ${label} / ${url}`
    )
    console.log('Saving...')
    handleAddBookmark({
      variables: {
        collectionId: widgetState._id,
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

  const updateModalId = (modalId: string) => {
    setModalId(modalId)
  }

  const updateWidget = (widget: Widget) => {
    setWidgetState(widget)
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
        handleRemoveSection()
        break
      case 'removeCustomCollectionModal':
        handleDeleteCollection()
        break
      default:
        return null
    }
  }

  // const onSave = () => {
  //   switch (modalId) {
  //     case 'addCustomLinkModal':
  //       return handleSaveCustomLink
  //     default:
  //       return null
  //   }
  // }

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
    onSave: handleSaveCustomLink, // this works but returning from the switch doesn't???
  }

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}
