import React from 'react'
import type { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import CustomModal from './CustomModal'
import { ModalProvider, useModalContext } from 'stores/modalContext'

export default {
  title: 'Layouts/Modal',
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <div className="sfds" id="modal-root">
            <Story />
          </div>
        </ModalProvider>
      )
    },
  ],
} as Meta

export const AddCustomLinkModal = () => {
  const {
    updateModalId,
    updateModalText,
    modalRef,
    updateWidget,
    updateCustomLinkLabel,
  } = useModalContext()

  const openCustomLinkModal = () => {
    updateModalId('addCustomLinkModal')
    updateModalText({
      headingText: 'Add a custom link',
    })

    updateWidget({
      _id: new ObjectId('641dee649934af1088164f20'),
      title: 'Title',
      type: 'Collection',
    })

    updateCustomLinkLabel('', false, true)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <>
      <button type="button" onClick={openCustomLinkModal}>
        Open modal
      </button>
      <CustomModal />
    </>
  )
}
