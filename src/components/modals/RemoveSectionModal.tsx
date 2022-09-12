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

import styles from './modal.module.scss'

import ModalPortal from 'components/util/ModalPortal'

type RemoveSectionModalProps = {
  onDelete: () => void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const RemoveSectionModal = ({
  onDelete,
  onCancel,
  modalRef,
  ...props
}: RemoveSectionModalProps) => {
  const modalId = 'removeSectionModal'

  return (
    <ModalPortal>
      <Modal
        {...props}
        id={modalId}
        ref={modalRef}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        className={styles.customLinkModal}
        modalRoot="#modal-root">
        <ModalHeading id={`${modalId}-heading`}>
          Are you sure you’d like to delete this section?
        </ModalHeading>
        <div className="usa-prose">
          <p id={`${modalId}-description`}>
            You can re-add it to your My Space from the Add Section menu.
          </p>
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

export default RemoveSectionModal
