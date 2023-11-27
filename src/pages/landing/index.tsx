import { InferGetServerSidePropsType } from 'next'
import { Table } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from '../../styles/pages/landingIndex.module.scss'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_LANDING_PAGES } from 'operations/cms/queries/getLandingPages'
import { client } from 'lib/keystoneClient'

type LandingPage = {
  pageTitle: string
  slug: string
}

const Landing = ({
  landingPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sortedLandingPages = landingPages.sort(
    (a: LandingPage, b: LandingPage) => a.pageTitle.localeCompare(b.pageTitle)
  )

  return (
    <div>
      <h1>Landing Pages</h1>
      <Table
        bordered
        striped
        className={`usa-table--borderless ${styles.table}`}>
        <tbody>
          {sortedLandingPages.map((landingPage: LandingPage) => {
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
    </div>
  )
}

export default Landing

Landing.getLayout = (page: JSX.Element) => withDefaultLayout(page, false)

export async function getServerSideProps() {
  const {
    data: { landingPages },
  } = await client.query({
    query: GET_LANDING_PAGES,
  })

  return {
    props: {
      landingPages,
    },
  }
}
