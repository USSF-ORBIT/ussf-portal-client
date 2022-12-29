import React, { createContext, useContext, useRef, useState } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { useAnalytics } from 'stores/analyticsContext'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useRemoveWidgetMutation } from 'operations/portal/mutations/removeWidget.g'
import { Widget } from 'types/index'

type ModalContextType = {
  modalId: string
  modalRef: React.RefObject<ModalRef> | null
  modalHeadingText: string
  closeModal: () => void
  onDelete: () => void
  updateWidget: (modalId: string, widget: Widget) => void
  updateModalText: ({
    headingText,
    descriptionText,
  }: {
    headingText: string
    descriptionText: string
  }) => void
  additionalText?: string
}

const ModalContext = createContext<ModalContextType>({
  modalId: '',
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
  const [widgetState, setWidgetState] = useState()

  // const [bookmarkObj, setBookmarkObj] = useState({})
  const modalRef = useRef<ModalRef>(null)
  const { trackEvent } = useAnalytics()

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
    descriptionText: string
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

  const updateWidget = (modalId: string, widget: Widget) => {
    setModalId(modalId)
    setWidgetState(widget)
  }

  const onDelete = () => {
    switch (modalId) {
      case 'removeSectionModal':
        handleRemoveSection()
        break
      case 'removeCustomCollectionModal':
        handleDeleteCollection()
        break
    }
  }

  const context = {
    modalId: '',
    modalRef,
    modalHeadingText,
    closeModal,
    onDelete,
    updateWidget,
    updateModalText,
    additionalText,
  }

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}
