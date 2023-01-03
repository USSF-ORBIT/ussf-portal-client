import React from 'react'
import type { ObjectId } from 'bson'

import styles from '../CustomCollection.module.scss'

import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'
import { useModalContext } from 'stores/modalContext'

export const CustomBookmark = ({
  bookmark,
  widgetId,
}: {
  bookmark: BookmarkType
  widgetId: ObjectId
}) => {
  const { url, label } = bookmark
  const {
    updateModalId,
    updateModalText,
    modalRef,
    updateBookmark,
    updateWidget,
  } = useModalContext()

  const handleEditLink = () => {
    updateModalId('editCustomLinkModal')
    updateModalText({
      headingText: 'Edit custom link',
    })

    updateWidget({ _id: widgetId })
    updateBookmark(bookmark)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <>
      <Bookmark
        href={url}
        onEdit={handleEditLink}
        className={styles.customLink}>
        <span className={styles.customLinkText}>{label || url}</span>
      </Bookmark>
    </>
  )
}
