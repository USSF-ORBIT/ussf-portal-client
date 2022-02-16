import React, { Children } from 'react'

import styles from './Collection.module.scss'

import Widget from 'components/Widget/Widget'

type PropTypes = {
  title?: string
  header?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
}

const Collection = ({ title = '', children, header, footer }: PropTypes) => {
  return (
    <Widget
      className={styles.collection}
      header={
        <>
          {title && <h3>{title}</h3>}
          {header}
        </>
      }>
      <ol className={styles.collectionList}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ol>

      {footer}
    </Widget>
  )
}

export default Collection
