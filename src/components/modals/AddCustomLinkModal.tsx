import React, { useRef } from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import styles from './modal.module.scss'

import ModalPortal from 'components/util/ModalPortal'

import { CustomBookmarkForm } from 'components/CustomCollection/CustomBookmark/CustomBookmarkForm'
type AddCustomLinkModalProps = {
  onSave: (url: string, label: string) => void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
  showAddWarning?: boolean
  customLinkLabel?: string
} & Omit<ModalProps, 'children' | 'id'>

const AddCustomLinkModal = ({
  onSave,
  onCancel,
  modalRef,
  showAddWarning,
  customLinkLabel,
  ...props
}: AddCustomLinkModalProps) => {
  const modalId = 'addCustomLinkModal'
  const nameInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  return (
    <ModalPortal>
      <Modal
        {...props}
        ref={modalRef}
        id={modalId}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        className={styles.customLinkModal}
        modalRoot="#modal-root">
        <ModalHeading id={`${modalId}-heading`}>Add a custom link</ModalHeading>
        <CustomBookmarkForm
          onSave={onSave}
          onCancel={onCancel}
          label={customLinkLabel}
          showAddWarning={showAddWarning}
          nameInputRef={nameInputRef}
          urlInputRef={urlInputRef}
        />
      </Modal>
    </ModalPortal>
  )
}

export default AddCustomLinkModal
