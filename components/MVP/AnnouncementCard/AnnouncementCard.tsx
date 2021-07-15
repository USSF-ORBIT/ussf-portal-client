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

interface AnnouncementCardProps {
  heading: string
  body?: string
  tag: string
  bgColor: string
}

const AnnouncementCard = ({
  heading,
  body,
  tag,
  bgColor,
}: AnnouncementCardProps) => {
  return (
    //#TODO check if col number needs to be dynamic
    <Card
      className={`tablet:grid-col-3 ${styles.card}`}
      containerProps={{ className: bgColor }}>
      <CardHeader>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      {body && (
        <CardBody>
          <p>{body}</p>
        </CardBody>
      )}
      <CardFooter>
        <Tag>{tag}</Tag>
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard
