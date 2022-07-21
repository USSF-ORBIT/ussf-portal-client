import React from 'react'
import styles from './AnnouncementDate.module.scss'

type PropTypes = {
  date: string
}

const AnnouncementDate = ({ date }: PropTypes) => {
  const dateObject = new Date(date)
  const utcDate = dateObject.toUTCString()

  const dateArr = utcDate.split(' ')
  const DAY = dateArr[1]
  const MONTH = dateArr[2].toUpperCase()
  const YYYY = dateArr[3]
  const HOUR = dateArr[4].split(':')[0]
  const MINUTE = dateArr[4].split(':')[1]

  return (
    <div className={styles.dateContainer}>
      <time className={styles.displayTime}>
        <span>
          {DAY} {MONTH}
        </span>
        <span>{YYYY} at</span>
        <span>
          {HOUR}:{MINUTE} GMT
        </span>
      </time>
    </div>
  )
}

export default AnnouncementDate
