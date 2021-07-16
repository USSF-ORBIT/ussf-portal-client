import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
} from '@trussworks/react-uswds'
import styles from './AnnouncementCard.module.scss'
import { ColumnSizes } from '@trussworks/react-uswds/lib/components/grid/types'

// To Implement
// - Custom text and color
// - Custom background image or color
// - Custom tag text, background color, text color
// - Custom heading
// External link and internal link support

interface AnnouncementCardProps {
  heading: string
  body?: string
  bgImage?: string
  tag: string
  bgColor: string
  cols: ColumnSizes
}

const AnnouncementCard = ({
  heading,
  body,
  tag,
  bgColor,
  bgImage,
  cols,
}: AnnouncementCardProps) => {
  const tagClass = classnames({
    'tag--news': /news/i.test(tag),
    'tag--training': /training/i.test(tag),
    'tag--about': /about/i.test(tag),
  })
  return (
    //#TODO check if col number needs to be dynamic

    <Card
      className={`${styles.card}`}
      containerProps={{
        className: bgColor,
        style: { background: `${bgImage}` },
      }}
      gridLayout={{ tablet: { col: cols } }}>
      <CardHeader>
        <h3 className="usa-card__heading text-white">{heading}</h3>
      </CardHeader>
      {body && (
        <CardBody>
          <p className="text-white">{body}</p>
        </CardBody>
      )}
      <CardFooter>
        <Tag className={tagClass}>{tag}</Tag>
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard
