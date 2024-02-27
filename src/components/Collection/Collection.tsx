import React, { Children } from 'react'

import styles from './Collection.module.scss'

import Widget from 'components/Widget/Widget'

type PropTypes = {
  title?: string
  header?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
  className?: string
}

const Collection = ({
  title = '',
  children,
  header,
  footer,
  className = '',
}: PropTypes) => {
  return (
    <Widget
      className={className}
      header={
        <>
          {title && <h2>{title}</h2>}
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
