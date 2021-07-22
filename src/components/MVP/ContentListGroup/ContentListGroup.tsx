import React from 'react'
import styles from './ContentListGroup.module.scss'

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
    <div className={`grid-container usa-prose contentLinks ${className}`}>
      <div className={`grid-row grid-gap contentLinks ${styles.contentLinks}`}>
        <div className="tablet:grid-col-8">
          <h2 className="font-heading-md text-normal border-top padding-top-2">
            {heading}
          </h2>
          <div className="section__links margin-top-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default ContentListGroup
