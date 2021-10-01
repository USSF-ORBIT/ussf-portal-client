import React from 'react'

import styles from './Collection.module.scss'

type PropTypes = {
  title: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
}

const Collection = ({ title, children, footer }: PropTypes) => {
  return (
    <div className={styles.collection}>
      <h3>{title}</h3>
      <ol>
        {Array.isArray(children) ? (
          children.map((child, i) => <li key={`bookmark_${i}`}>{child}</li>)
        ) : (
          <li key={`bookmark_0`}>{children}</li>
        )}
      </ol>

      {footer}
    </div>
  )
}

export default Collection
