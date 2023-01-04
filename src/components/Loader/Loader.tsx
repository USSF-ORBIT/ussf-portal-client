import React from 'react'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <p className="usa-sr-only">Content is loading...</p>

    <div className={styles.container}>
      <div className={styles.planet}>
        <img src="/assets/images/earth.svg" alt=" " />
      </div>
      <div className={styles.sate}>
        <div></div>
      </div>
    </div>
  </div>
)

export default Loader
