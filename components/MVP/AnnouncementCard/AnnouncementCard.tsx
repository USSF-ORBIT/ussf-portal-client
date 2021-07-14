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

const AnnouncementCard = () => {
  return (
    <Card className={`tablet:grid-col-3 ${styles.card}`}>
      <CardHeader>
        <h3 className="usa-card__heading">Happy Birthday!</h3>
      </CardHeader>
      <CardBody>
        <p>It&apos;s been a ONE-derful year!</p>
      </CardBody>
      <CardFooter>
        <Tag>News</Tag>
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard
