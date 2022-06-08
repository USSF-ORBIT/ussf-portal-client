import React from 'react'
import { Tag as USWDSTag, Icon } from '@trussworks/react-uswds'

import styles from './Tag.module.scss'

import { CONTENT_CATEGORIES } from 'constants/index'

const LabelTypes = ['Source', 'All', 'Base'] as const

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <USWDSTag className={styles.Tag}>{children}</USWDSTag>
)

export const Label = ({
  type,
  children,
}: {
  type: typeof LabelTypes[number]
  children: React.ReactNode
}) => (
  <USWDSTag className={`${styles.Label} ${styles[type]}`}>
    <Icon.Label size={3} /> {children}
  </USWDSTag>
)

export const Category = ({
  category,
}: {
  category: typeof CONTENT_CATEGORIES[keyof typeof CONTENT_CATEGORIES]
}) => (
  <USWDSTag className={`${styles.Category} ${styles[category.value]}`}>
    {category.label}
  </USWDSTag>
)
