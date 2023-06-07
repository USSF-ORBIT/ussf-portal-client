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
      <a className="usa-skipnav" href="/announcements" target="_blank">
        Latest Announcements in Accessible Format (opens in a new tab)
      </a>
      <a className="usa-skipnav" href="#skip-announcements-carousel">
        Skip Component
      </a>
      <AnnouncementCarousel announcements={announcements} />
    </div>
  </div>
)

export default Announcement
