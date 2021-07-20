import React from 'react'

interface ContentListItemProps {
  children: React.ReactNode
  heading: string
  className?: string
  path: string
}

const ContentListItem = ({
  children,
  heading,
  path,
}: ContentListItemProps): React.ReactElement => {
  return (
    <a href={path} className="section-links__item grid-row">
      <div className="tablet:grid-col-4">
        <h3>{heading}</h3>
      </div>
      <div className="tablet:grid-col-8">
        <p>{children}</p>
      </div>
    </a>
  )
}

export default ContentListItem
