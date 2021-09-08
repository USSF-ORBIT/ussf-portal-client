import React from 'react'

import styles from './Collection.module.scss'

type PropTypes = {
  title: React.ReactNode
  children: React.ReactNode[]
}

const Collection = ({ title, children }: PropTypes) => {
  return (
    <div className={styles.collection}>
      <h3>{title}</h3>
      <ol>
        {children.map((child, i) => (
          <li key={`bookmark_${i}`}>{child}</li>
        ))}
      </ol>
    </div>
  )
}

export default Collection
