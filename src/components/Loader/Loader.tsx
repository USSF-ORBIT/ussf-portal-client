import React from 'react'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    {/* <img className="maxw-10" src="/img/ussf-logo-vert.svg" alt="Space Force" /> */}

    <p className="sr-only">Content is loading...</p>

    <div className={styles.container}>
      <div className={styles.planet}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.rocket}>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
      </div>
    </div>
  </div>
)

export default Loader
