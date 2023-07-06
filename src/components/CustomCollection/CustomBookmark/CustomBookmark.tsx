import React from 'react'
import type { ObjectId } from 'bson'

import styles from '../CustomCollection.module.scss'

import Bookmark from 'components/Bookmark/Bookmark'
import type { MongoBookmark } from 'types/index'
import { useModalContext } from 'stores/modalContext'

export const CustomBookmark = ({
  bookmark,
  widgetId,
  collectionTitle,
}: {
  bookmark: MongoBookmark
  widgetId: ObjectId
  collectionTitle: string
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

    // The collectionTitle isn't needed here, but adding it in to maintain the Widget type
    // while performing operations against the bookmark
    updateWidget({ _id: widgetId, title: collectionTitle, type: 'Collection' })
    updateBookmark(bookmark)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <>
      <Bookmark
        href={url}
        onEdit={handleEditLink}
        label={label}
        className={styles.customLink}>
        <span className={styles.customLinkText}>{label || url}</span>
      </Bookmark>
    </>
  )
}
