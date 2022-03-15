import React from 'react'

import styles from './AnnouncementLaunch.module.scss'

const AnnouncementLaunch = () => (
  <div className={styles.launchAnnouncement}>
    <img
      src="/assets/images/launch_rocket.png"
      alt="Illustration of a rocket launching"
      className={styles.launchRocket}
      width={182}
      height={205}
    />

    <h2>Welcome to the new Space Force Service Portal!</h2>
    <h3>A customizable platform that supports your Guardian experience.</h3>

    <p>
      Use this portal to connect all your needed websites &amp; applications and
      customize your My Space with your top applications and Space Force news.
      Share your feedback, too &mdash; we’re always looking for ways to make the
      portal more useful for you!
    </p>
  </div>
)

export default AnnouncementLaunch
