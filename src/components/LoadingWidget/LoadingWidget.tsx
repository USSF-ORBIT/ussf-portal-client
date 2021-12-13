import React from 'react'

import styles from './LoadingWidget.module.scss'

const LoadingWidget = () => (
  <div className={styles.loadingWidget}>
    <p className="usa-sr-only">Content is loading...</p>
  </div>
)

export default LoadingWidget
