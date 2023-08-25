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
        <div className={styles.earth}>
          <img src="/assets/images/hero-transparent.png" alt=" " />
        </div>
        <div className={styles.cosmos}>
          <div className={styles.star}></div>
          <div className={styles.meteor1}></div>
          <div className={styles.meteor2}></div>
          <div className={styles.meteor3}></div>
          <div className={styles.meteor4}></div>
          <div className={styles.meteor5}></div>
          <div className={styles.meteor6}></div>
          <div className={styles.meteor7}></div>
          <div className={styles.meteor8}></div>
          <div className={styles.meteor9}></div>
          <div className={styles.meteor10}></div>
          <div className={styles.meteor11}></div>
          <div className={styles.meteor12}></div>
          <div className={styles.meteor13}></div>
          <div className={styles.meteor14}></div>
          <div className={styles.meteor15}></div>
        </div>
      </div>
    </div>
  </div>
)

export default Loader
