import React from 'react'

import styles from './CustomCollection.module.scss'

import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'

export const CustomBookmark = ({
  bookmark,
  handleEdit,
}: {
  bookmark: BookmarkType
  handleEdit: () => void
}) => {
  const { url, label } = bookmark

  return (
    <Bookmark href={url} onEdit={handleEdit} className={styles.customLink}>
      {label || url}
    </Bookmark>
  )
}
