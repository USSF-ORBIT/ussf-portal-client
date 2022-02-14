import React, { Children } from 'react'

import styles from './Collection.module.scss'

import Section from 'components/Section/Section'

type PropTypes = {
  title?: string
  header?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
}

const Collection = ({ title = '', children, header, footer }: PropTypes) => {
  return (
    <Section
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
    </Section>
  )
}

export default Collection
