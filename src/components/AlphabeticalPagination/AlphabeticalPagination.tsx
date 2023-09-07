// component itself

import React from 'react'
import styles from './AlphabeticalPagination.module.scss'

const AlphabeticalPagination = () => (
  <div className={styles.alphapag}>
    <nav className="usa-pagination"></nav>
    {/* uswds uses quotes, not curlies */}
  </div>
)

export default AlphabeticalPagination
