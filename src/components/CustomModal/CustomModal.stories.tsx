import React from 'react'
import type { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import CustomModal from './CustomModal'
import { ModalProvider, useModalContext } from 'stores/modalContext'

export default {
  title: 'Layouts/Modals',
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <div id="modal-root">
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

export const EditCustomLinkModal = () => {
  const {
    updateModalId,
    updateModalText,
    modalRef,
    updateWidget,
    updateBookmark,
  } = useModalContext()

  const mockBookmark = {
    _id: new ObjectId('641dee649934af1088164f56'),
    url: 'https://google.com',
    label: 'My Custom Bookmark',
  }

  const openCustomLinkModal = () => {
    updateModalId('editCustomLinkModal')
    updateModalText({
      headingText: 'Edit custom link',
    })

    updateWidget({
      _id: new ObjectId('641dee649934af1088164f21'),
      title: 'Title',
      type: 'Collection',
    })

    updateBookmark(mockBookmark)

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

export const RemoveCustomCollectionModal = () => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const openCustomLinkModal = () => {
    updateModalId('removeCustomCollectionModal')

    updateModalText({
      headingText:
        'Are you sure you’d like to delete this collection from My Space?',
      descriptionText: 'This action cannot be undone.',
    })

    updateWidget({
      _id: new ObjectId('641dee649934af1088164f89'),
      title: 'Title',
      type: 'Collection',
    })

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

export const RemoveWidgetModal = () => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const openCustomLinkModal = () => {
    updateModalId('removeNewsWidgetModal')

    updateModalText({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })

    updateWidget({
      _id: new ObjectId('641dee649934af1088164f89'),
      title: 'Title',
      type: 'Collection',
    })

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
