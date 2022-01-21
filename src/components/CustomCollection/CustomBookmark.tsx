import React, { useRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'

import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'
import EditCustomLinkModal from 'components/modals/EditCustomLinkModal'

export const CustomBookmark = ({
  bookmark,
  onSave,
  onDelete,
}: {
  bookmark: BookmarkType
  onSave: (label?: string, url?: string) => void
  onDelete: () => void
}) => {
  const editCustomLinkModal = useRef<ModalRef>(null)
  const { url, label } = bookmark

  const handleEditLink = () =>
    editCustomLinkModal.current?.toggleModal(undefined, true)

  const handleSaveLink = (label: string, url: string) => {
    editCustomLinkModal.current?.toggleModal(undefined, false)
    onSave(label, url)
  }

  const handleCancel = () =>
    editCustomLinkModal.current?.toggleModal(undefined, false)

  const handleDeleteLink = () => {
    editCustomLinkModal.current?.toggleModal(undefined, false)
    onDelete()
  }

  return (
    <>
      <Bookmark
        href={url}
        onEdit={handleEditLink}
        className={styles.customLink}>
        {label || url}
      </Bookmark>

      <EditCustomLinkModal
        bookmark={bookmark}
        modalRef={editCustomLinkModal}
        onCancel={handleCancel}
        onSave={handleSaveLink}
        onDelete={handleDeleteLink}
      />
    </>
  )
}
