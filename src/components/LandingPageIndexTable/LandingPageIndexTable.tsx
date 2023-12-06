import React from 'react'
import { Table, Tag } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './LandingPageIndexTable.module.scss'
import { isPublished } from 'helpers/index'
import { PublishableItemType } from 'types'

type LandingPage = {
  pageTitle: string
  slug: string
} & PublishableItemType

type LandingPageIndexTableProps = {
  landingPages: LandingPage[]
}

const LandingPageIndexTable = ({
  landingPages,
}: LandingPageIndexTableProps) => {
  return (
    <Table bordered striped className={`usa-table--borderless ${styles.table}`}>
      <tbody>
        {landingPages.map((landingPage: LandingPage) => {
          const rowId = `landing_page_${landingPage.slug}`
          return (
            <tr id={rowId} key={rowId}>
              <td>
                <Link href={`/landing/${landingPage.slug}`}>
                  {landingPage.pageTitle}
                </Link>
                {isPublished(landingPage) ? null : (
                  <Tag className={styles.status}>{landingPage.status}</Tag>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default LandingPageIndexTable
