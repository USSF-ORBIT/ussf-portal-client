import React from 'react'
import { Table, Tag } from '@trussworks/react-uswds'
import Link from 'next/link'
import { DateTime } from 'luxon'
import styles from './LandingPageIndexTable.module.scss'
import { PublishableItemType } from 'types'

type LandingPage = {
  pageTitle: string
  slug: string
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
          const rowId = `landing_page_${landingPage.slug}`
          // if the date is in the past we want to show past tense text
          const publishText =
            landingPage.publishedDate &&
            DateTime.fromISO(landingPage.publishedDate) > DateTime.now()
              ? 'Publishing'
              : 'Published'
          // if a future publish date is set format the date for display
          // we don't need to check if the date is in the future as the
          // isPublished helper function will return false if the date is in the future
          const status =
            landingPage.status === 'Published'
              ? `${publishText} on: ${DateTime.fromISO(
                  landingPage.publishedDate
                ).toFormat('dd MMM yyyy HH:mm')}`
              : landingPage.status
          return (
            <tr id={rowId} key={rowId}>
              <td>
                <Link href={`/landing/${landingPage.slug}`}>
                  {landingPage.pageTitle}
                </Link>

                {showStatus ? (
                  <Tag className={`${styles.status} ${landingPage.status}`}>
                    {status}
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
