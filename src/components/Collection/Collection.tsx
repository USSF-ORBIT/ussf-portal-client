import React, { Children } from 'react'

import styles from './Collection.module.scss'

type PropTypes = {
  title?: string
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
  header?: React.ReactNode
}

const Collection = ({ title = '', children, header, footer }: PropTypes) => {
  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        {title && <h3>{title}</h3>}
        {header}
      </div>

      <ol>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ol>

      {footer}
    </div>
  )
}

export default Collection
