import React from 'react'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <p className="usa-sr-only">Content is loading...</p>

    <div className={styles.container}>
      <div className={styles.front}>
        <img src="/assets/images/delta-stacked-light.png" alt=" " />
      </div>
      <div className={styles.back}>
        <div className={styles.stars}></div>
      </div>
    </div>
  </div>
)

export default Loader
