import React from 'react'
import styles from './AnnouncementInfo.module.scss'

type PropTypes = {
  date: string
  title: string
  body: string
}

const AnnouncementInfo = ({ date, title, body }: PropTypes) => (
  <div className={styles.announcementContainer}>
    <h4 className={styles.date}>{date}</h4>

    <hr className={styles.divider} />

    <div className={styles.mainContent}>
      <label className={styles.title}>{title}</label>
      <div className={styles.body}>{body}</div>
    </div>
  </div>
)

export default AnnouncementInfo
