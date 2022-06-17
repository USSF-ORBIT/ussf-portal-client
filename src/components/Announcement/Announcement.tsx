import React from 'react'
import styles from './Announcement.module.scss'
import AnnouncementCarousel from 'components/AnnouncementCarousel/AnnouncementCarousel'
import { AnnouncementRecord } from 'types'

const Announcement = ({
  announcements,
}: {
  announcements: AnnouncementRecord[]
}) => (
  <div className={styles.announcement}>
    <h2 className={styles.latestAnnouncements}>Latest announcements</h2>
    <div className={styles.announcementContainer}>
      <AnnouncementCarousel announcements={announcements} />
    </div>
  </div>
)

export default Announcement
