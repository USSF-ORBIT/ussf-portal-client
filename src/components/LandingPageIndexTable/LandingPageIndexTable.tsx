import React from 'react'
import { Table, Tag } from '@trussworks/react-uswds'
import Link from 'next/link'
import { DateTime } from 'luxon'
import styles from './LandingPageIndexTable.module.scss'
import { PublishableItemType } from 'types'

type LandingPage = {
  pageTitle: string
  slug: string
  badge: {
    url: string
  }
} & PublishableItemType

type LandingPageIndexTableProps = {
  landingPages: LandingPage[]
  showStatus: boolean
}

const LandingPageIndexTable = ({
  landingPages,
  showStatus,
}: LandingPageIndexTableProps) => {
  return (
    <Table bordered striped className={`usa-table--borderless ${styles.table}`}>
      <tbody>
        {landingPages.map((landingPage: LandingPage) => {
          const { pageTitle, slug, badge, publishedDate, status } = landingPage

          const rowId = `landing_page_${slug}`
          // if the date is in the past we want to show past tense text
          const publishText =
            publishedDate && DateTime.fromISO(publishedDate) > DateTime.now()
              ? 'Publishing'
              : 'Published'
          // if a future publish date is set format the date for display
          // we don't need to check if the date is in the future as the
          // isPublished helper function will return false if the date is in the future
          const landingPageStatus =
            status === 'Published'
              ? `${publishText} on: ${DateTime.fromISO(publishedDate).toFormat(
                  'dd MMM yyyy HH:mm'
                )}`
              : status

          const badgeImage = badge?.url.length
            ? badge.url
            : '/img/default_badge.png'
          return (
            <tr id={rowId} key={rowId}>
              <td>
                <div style={{ display: 'flex', alignContent: 'center' }}>
                  <img
                    src={badgeImage}
                    alt="landing page badge"
                    className={styles.badge}
                  />

                  <Link href={`/landing/${landingPage.slug}`}>{pageTitle}</Link>
                </div>

                {showStatus ? (
                  <Tag className={`${styles.status} ${status}`}>
                    {landingPageStatus}
                  </Tag>
                ) : null}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default LandingPageIndexTable
