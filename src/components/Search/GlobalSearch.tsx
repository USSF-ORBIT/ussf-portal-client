import React from 'react'
import { Search } from '@trussworks/react-uswds'
import styles from './GlobalSearch.module.scss'

const GlobalSearch = () => {
  const submitSearch = () => {
    return
  }
  return (
    <Search
      className={styles.globalSearch}
      size="big"
      onSubmit={submitSearch}
    />
  )
}

export default GlobalSearch
