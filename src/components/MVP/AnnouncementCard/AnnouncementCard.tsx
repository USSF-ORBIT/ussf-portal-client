import React from 'react'
import { Card, CardBody, CardFooter, Tag } from '@trussworks/react-uswds'
import { ColumnSizes } from '@trussworks/react-uswds/lib/components/grid/types'

import styles from './AnnouncementCard.module.scss'

import LinkTo from 'components/util/LinkTo/LinkTo'

export interface AnnouncementCardProps {
  body?: string
  bgColor: string
  cols: ColumnSizes
  heading: React.ReactNode
  path: string
  tag: string
}

const AnnouncementCard = ({
  body,
  bgColor,
  cols,
  heading,
  path,
  tag,
}: AnnouncementCardProps) => {
  return (
    <Card
      className={`${styles.card}`}
      containerProps={{
        className: bgColor,
      }}
      gridLayout={{ tablet: { col: cols } }}>
      <LinkTo href={path} className={`${styles.cardLink}`}>
        <CardBody>
          <h3 className="usa-card__heading text-white">{heading}</h3>
          {body && <p className="text-white">{body}</p>}
        </CardBody>

        <CardFooter>
          <Tag className={`text-ink tag--${tag}`}>{tag}</Tag>
        </CardFooter>
      </LinkTo>
    </Card>
  )
}

export default AnnouncementCard
