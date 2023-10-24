import { InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import { client } from 'lib/keystoneClient'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import styles from 'styles/pages/news.module.scss'
import { GET_LANDING_PAGES } from 'operations/cms/queries/getLandingPages'
import { withLandingPageLayout } from 'layout/DefaultLayout/LandingPageLayout'

// TODO: finish this type and place in types file
type LandingPage = {
  id: string
  pageTitle: string
  slug: string
}

const LandingPages = ({
  landingPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { loading } = useUser()

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.listContainer}>
      <Grid>
        <ul>
          {landingPages.map((landingPage: LandingPage) => {
            return (
              <li key={`landing_page_` + landingPage.slug}>
                <Link href={`/landing-pages/${landingPage.slug}`}>
                  {landingPage.pageTitle}
                </Link>
              </li>
            )
          })}
        </ul>
      </Grid>
    </div>
  )
}

export default LandingPages

LandingPages.getLayout = (page: JSX.Element) => withLandingPageLayout(page)

export async function getServerSideProps() {
  const {
    data: { landingPages },
  } = await client.query({
    query: GET_LANDING_PAGES,
  })

  return {
    props: {
      landingPages,
      pageTitle: 'Landing Pages',
    },
  }
}
