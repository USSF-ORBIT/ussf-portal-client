import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import styles from './AnnouncementInfo.module.scss'
import { AnnouncementRecord } from 'types'

const AnnouncementInfo = ({
  announcement,
}: {
  announcement: AnnouncementRecord
}) => {
  const {
    title,
    publishedDate,
    body: { document },
  } = announcement

  // const dateFormatter = new Intl.DateTimeFormat('en-us', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: '2-digit',
  // })

  const publishedDateObj = new Date(publishedDate)

  return (
    <div className={styles.announcementContainer}>
      {/*
      <time
        className={styles.date}
        dateTime={publishedDateObj.toLocaleString()}>
        {dateFormatter.format(publishedDateObj)}
      </time>
      */}
      <time className={styles.date}>{publishedDateObj.toUTCString()}</time>

      <hr className={styles.divider} />

      <div className={styles.mainContent}>
        <label className={styles.title}>{title}</label>
        <DocumentRenderer document={document} />
      </div>
    </div>
  )
}

export default AnnouncementInfo
