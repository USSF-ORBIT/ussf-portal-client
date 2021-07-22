import React from 'react'
import styles from './ContentListItem.module.scss'

interface ContentListGroupProps {
  children: React.ReactNode
  heading?: string
  className?: string
}

const ContentListGroup = ({
  children,
  heading,
  className,
}: ContentListGroupProps): React.ReactElement => {
  return (
    <div className={`${styles.contentLinks} ${className}`}>
      <h2 className="font-heading-md text-normal border-top padding-top-2">
        {heading}
      </h2>
      <div className="section__links margin-top-3">{children}</div>
    </div>
  )
}

export default ContentListGroup
