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

// To Implement
// - Custom text and color
// - Custom background image or color
// - Custom tag text, background color, text color
// - Custom heading
// External link and internal link support

interface AnnouncementCardProps {
  heading: string
  body?: string
  tag: string
  bgColor: string
  bgTag: string
  textColor: string
}

const AnnouncementCard = ({
  heading,
  body,
  tag,
  bgColor,
  bgTag,
  textColor,
}: AnnouncementCardProps) => {
  return (
    //#TODO check if col number needs to be dynamic

    <Card
      className={`${styles.card}`}
      containerProps={{ className: bgColor }}
      gridLayout={{ tablet: { col: 3 } }}>
      <CardHeader>
        <h3 className={`usa-card__heading ${textColor}`}>{heading}</h3>
      </CardHeader>
      {body && (
        <CardBody>
          <p className={textColor}>{body}</p>
        </CardBody>
      )}
      <CardFooter>
        <Tag className={textColor + ' ' + bgTag}>{tag}</Tag>
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard
