import React, { useRef } from 'react'
import type { Meta } from '@storybook/react'
import type { ModalRef } from '@trussworks/react-uswds'
import { ObjectId } from 'bson'
import AddCustomLinkModal from './AddCustomLinkModal'
import EditCustomLinkModal from './EditCustomLinkModal'
import RemoveCustomCollectionModal from './RemoveCustomCollectionModal'
import RemoveSectionModal from './RemoveSectionModal'

export default {
  title: 'Layouts/Modals',
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

export const AddCustomLinkModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <AddCustomLinkModal
        modalRef={storybookModal}
        onSave={closeModal}
        onCancel={closeModal}
      />
    </>
  )
}

export const AddCustomLinkWithWarningModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <AddCustomLinkModal
        modalRef={storybookModal}
        onSave={closeModal}
        onCancel={closeModal}
        showAddWarning={true}
      />
    </>
  )
}

export const EditCustomLinkModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  const testBookmark = {
    _id: new ObjectId(),
    label: 'My Custom Link',
    url: 'http://www.example.com',
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <EditCustomLinkModal
        modalRef={storybookModal}
        onSave={closeModal}
        onCancel={closeModal}
        onDelete={closeModal}
        bookmark={testBookmark}
      />
    </>
  )
}

export const RemoveCustomCollectionModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <RemoveCustomCollectionModal
        modalRef={storybookModal}
        onDelete={closeModal}
        onCancel={closeModal}
      />
    </>
  )
}

export const RemoveSectionModalStory = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)
  const closeModal = () => storybookModal.current?.toggleModal(undefined, false)

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <RemoveSectionModal
        modalRef={storybookModal}
        onDelete={closeModal}
        onCancel={closeModal}
      />
    </>
  )
}
