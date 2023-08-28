import React from 'react'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <p className="usa-sr-only">Content is loading...</p>

    <div aria-hidden="true" className={styles.container}>
      <div className={styles.front}>
        <img src="/assets/images/delta-stacked-light.png" alt=" " />
      </div>
      <div className={styles.back}>
        <div className={styles.earth}></div>
        <div className={styles.cosmos}>
          <div className={styles.star}></div>
          <div className={styles.spinner}>
            <div className={styles.face}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.face}>
              <div className={styles.circle}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Loader
