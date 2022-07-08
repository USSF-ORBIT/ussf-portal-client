import React from 'react'
import styles from './SettingsContainer.module.scss'

const SettingsContainer = () => {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>Settings</h2>
      </div>
    </div>
  )
}

export default SettingsContainer
