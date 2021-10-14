import React from 'react'

import styles from './Collection.module.scss'

type PropTypes = {
  title?: React.ReactNode // should we make this optional b/c of custom?
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
  header?: React.ReactNode
}

const Collection = ({ title, children, header, footer }: PropTypes) => {
  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        {title && <h3>{title}</h3>}
        {header}
      </div>

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
