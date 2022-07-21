import React from 'react'

import styles from './SearchBanner.module.scss'

export const SearchBanner = ({
  icon,
  children,
}: {
  icon?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className={styles.SearchBanner}>
      {icon}
      {children}
      {icon}
    </div>
  )
}
