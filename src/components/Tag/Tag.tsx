import React from 'react'
import { Tag as USWDSTag, Icon } from '@trussworks/react-uswds'

import styles from './Tag.module.scss'

import { CONTENT_CATEGORIES } from 'constants/index'

/**
 * Label Types:
 * - Source = the source of the content, ie "SpaceForce.mil"
 * - Audience = the target audience of the content, ie "All Guardians"
 * - Base = any Space Force base(s) that the content relates to
 */
const LabelTypes = ['Source', 'Audience', 'Base'] as const

/** <Tag /> is used to display arbitrary tags, can render any content */
export const Tag = ({ children }: { children: React.ReactNode }) => (
  <USWDSTag className={styles.Tag}>{children}</USWDSTag>
)

/** <Label /> is used to render arbitrary labels that fall into one of the three types (defined above) */
export const Label = ({
  type,
  children,
}: {
  type: typeof LabelTypes[number]
  children: React.ReactNode
}) => (
  <USWDSTag className={`${styles.Label} ${styles[type]}`}>
    <Icon.Label aria-label="label" size={3} /> {children}
  </USWDSTag>
)

/** <Category /> is used to render a specific category, as defined in the constants file */
export const Category = ({
  category,
}: {
  category: typeof CONTENT_CATEGORIES[keyof typeof CONTENT_CATEGORIES]
}) => (
  <USWDSTag className={`${styles.Category} ${styles[category.value]}`}>
    {category.label}
  </USWDSTag>
)
