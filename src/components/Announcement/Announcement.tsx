import React from 'react'
import AnnouncementCarousel from 'components/AnnouncementCarousel/AnnouncementCarousel'
import styles from './Announcement.module.scss'

const Announcement = () => (
  <div className={styles.announcement}>
    <h2 className={styles.latestAnnouncements}>Latest Announcements</h2>
    <div className={styles.announcementContainer}>
      <AnnouncementCarousel />
    </div>
  </div>
)

export default Announcement
