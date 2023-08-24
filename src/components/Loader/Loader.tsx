import React from 'react'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <p className="usa-sr-only">Content is loading...</p>

    <div className={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/United_States_Space_Force_logo.svg/1200px-United_States_Space_Force_logo.svg.png"
        alt=" "
      />
    </div>
  </div>
)

export default Loader
