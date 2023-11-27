import React from 'react'
import { Table } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './LandingPageIndexTable.module.scss'

type LandingPage = {
  pageTitle: string
  slug: string
}

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
          return (
            <tr key={`landing_page_` + landingPage.slug}>
              <td>
                <Link href={`/landing/${landingPage.slug}`}>
                  {landingPage.pageTitle}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default LandingPageIndexTable
