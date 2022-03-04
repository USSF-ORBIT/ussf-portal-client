import React from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Tag,
  Button,
} from '@trussworks/react-uswds'
import { ColumnSizes } from '@trussworks/react-uswds/lib/components/grid/types'

import styles from './AnnouncementCard.module.scss'

import LinkTo from 'components/util/LinkTo/LinkTo'

export interface AnnouncementCardProps {
  body?: string
  bgColor: string
  cols: ColumnSizes
  heading: React.ReactNode
  path?: string
  tag: string
  onClick?: () => void
}

const AnnouncementCard = ({
  body,
  bgColor,
  cols,
  heading,
  path,
  tag,
  onClick,
}: AnnouncementCardProps) => {
  return (
    <Card
      className={`${styles.card}`}
      containerProps={{
        className: bgColor,
      }}
      gridLayout={{ tablet: { col: cols } }}>
      {path && (
        <LinkTo href={path} className={`${styles.cardLink}`}>
          <CardBody>
            <h3 className="usa-card__heading text-white">{heading}</h3>
            {body && <p className="text-white">{body}</p>}
          </CardBody>

          <CardFooter>
            <Tag className={`text-ink tag--${tag}`}>{tag}</Tag>
          </CardFooter>
        </LinkTo>
      )}

      {!path && onClick && (
        <Button
          unstyled
          type="button"
          onClick={onClick}
          className={`${styles.cardLink}`}>
          <CardBody>
            <h3 className="usa-card__heading text-white">{heading}</h3>
            {body && <p className="text-white">{body}</p>}
          </CardBody>

          <CardFooter>
            <Tag className={`text-ink tag--${tag}`}>{tag}</Tag>
          </CardFooter>
        </Button>
      )}
    </Card>
  )
}

export default AnnouncementCard
