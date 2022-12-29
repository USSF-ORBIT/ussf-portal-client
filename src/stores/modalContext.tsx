import React, { createContext, useContext, useRef, useState } from 'react'
import { ModalRef } from '@trussworks/react-uswds'

type ModalContextType = {
  modalId: string
  modalRef: React.RefObject<ModalRef> | null
  modalHeadingText: string
  closeModal: () => void
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
  updateModalText: () => {
    return
  },
  additionalText: '',
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalHeadingText, setModalHeadingText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  // const [bookmarkObj, setBookmarkObj] = useState({})
  const modalRef = useRef<ModalRef>(null)

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

  const context = {
    modalId: '',
    modalRef,
    modalHeadingText,
    closeModal,
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
