import React, { useRef } from 'react'
import type { Meta } from '@storybook/react'
import type { ModalRef } from '@trussworks/react-uswds'
import { ObjectId } from 'bson'
import CustomModal from './CustomModal'
import { ModalProvider, useModalContext } from 'stores/modalContext'

export default {
  title: 'Layouts/Modal',
  decorators: [
    (Story) => {
      return (
        <div className="sfds" id="modal-root">
          <Story />
        </div>
      )
    },
  ],
} as Meta

export const CustomModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const openCustomLinkModal = () => {
    updateModalId('addCustomLinkModal')
    updateModalText({
      headingText: 'Add a custom link',
    })

    // updateWidget({ _id: _id, title: title, type: 'Collection' })

    // updateCustomLinkLabel(customLabel, showAddWarning, isAddingLink)

    modalRef?.current?.toggleModal(undefined, true)
    // openModal()
  }

  return (
    <ModalProvider>
      <button type="button" onClick={openCustomLinkModal}>
        Open modal
      </button>
      <CustomModal />
    </ModalProvider>
  )
}
