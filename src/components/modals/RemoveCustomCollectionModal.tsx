import React from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ButtonGroup,
  Button,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'

type RemoveCustomCollectionModalProps = {
  onDelete: () => void
  onCancel: () => void
} & Omit<ModalProps, 'children' | 'id'>

const RemoveCustomCollectionModal = ({
  onDelete,
  onCancel,
  ...props
}: RemoveCustomCollectionModalProps) => {
  const modalId = 'removeCustomCollectionModal'

  return (
    <ModalPortal>
      <Modal
        {...props}
        id={modalId}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        modalRoot="#modal-root">
        <ModalHeading id={`${modalId}-heading`}>
          Are you sure you&apos;d like to delete this collection from My Space?
        </ModalHeading>
        <div className="usa-prose">
          <p id={`${modalId}-description`}>This action cannot be undone.</p>
        </div>

        <ButtonGroup>
          <Button type="submit" data-close-modal onClick={() => onDelete()}>
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
      </Modal>
    </ModalPortal>
  )
}

export default RemoveCustomCollectionModal
