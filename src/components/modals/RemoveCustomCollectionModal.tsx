import React from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ModalFooter,
  ModalRef,
  ButtonGroup,
  Button,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'

type RemoveCustomCollectionModalProps = {
  onDelete: () => void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const RemoveCustomCollectionModal = ({
  onDelete,
  onCancel,
  modalRef,
  ...props
}: RemoveCustomCollectionModalProps) => {
  const modalId = 'removeCustomCollectionModal'

  return (
    <ModalPortal>
      <Modal
        {...props}
        id={modalId}
        ref={modalRef}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        modalRoot="#modal-root">
        <ModalHeading id={`${modalId}-heading`}>
          Are you sure you’d like to delete this collection from My Space?
        </ModalHeading>
        <div className="usa-prose">
          <p id={`${modalId}-description`}>This action cannot be undone.</p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <Button type="submit" data-close-modal onClick={onDelete}>
              Delete
            </Button>
            <Button
              type="button"
              data-close-modal
              unstyled
              className="padding-105 text-center"
              onClick={onCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </ModalPortal>
  )
}

export default RemoveCustomCollectionModal
