import React, { useRef } from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import styles from './modal.module.scss'

import ModalPortal from 'components/util/ModalPortal'
import type { Bookmark as BookmarkType } from 'types/index'

import { CustomBookmarkForm } from 'components/CustomCollection/CustomBookmark/CustomBookmarkForm'
type EditCustomLinkModalProps = {
  bookmark: BookmarkType
  onSave: (url: string, label: string) => void
  onCancel: () => void
  onDelete: () => void
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const EditCustomLinkModal = ({
  bookmark,
  onSave,
  onCancel,
  onDelete,
  modalRef,
  ...props
}: EditCustomLinkModalProps) => {
  const modalId = 'editCustomLinkModal'
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
        <ModalHeading id={`${modalId}-heading`}>Edit custom link</ModalHeading>
        <CustomBookmarkForm
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
          label={bookmark.label}
          url={bookmark.url}
          nameInputRef={nameInputRef}
          urlInputRef={urlInputRef}
        />
      </Modal>
    </ModalPortal>
  )
}

export default EditCustomLinkModal
