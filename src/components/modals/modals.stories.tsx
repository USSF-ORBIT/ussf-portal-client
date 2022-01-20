import React, { useRef } from 'react'
import type { Meta } from '@storybook/react'
import type { ModalRef } from '@trussworks/react-uswds'

import JoinBetaModal from './JoinBetaModal'
import AddCustomLinkModal from './AddCustomLinkModal'
import RemoveCustomCollectionModal from './RemoveCustomCollectionModal'

export default {
  title: 'Components/Modals',
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

export const joinBetaModal = () => {
  const storybookModal = useRef<ModalRef>(null)
  const openModal = () => storybookModal.current?.toggleModal(undefined, true)

  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <JoinBetaModal modalRef={storybookModal} />
    </>
  )
}

export const addCustomLinkModal = () => {
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

export const removeCustomCollectionModal = () => {
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
