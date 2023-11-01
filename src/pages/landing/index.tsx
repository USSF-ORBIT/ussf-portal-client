import { InferGetServerSidePropsType } from 'next'
import { Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
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
  return (
    <div>
      <h1>Landing Pages</h1>
      <div>
        <Grid>
          <ul>
            {landingPages.map((landingPage: LandingPage) => {
              return (
                <li key={`landing_page_` + landingPage.slug}>
                  <Link href={`/landing/${landingPage.slug}`}>
                    {landingPage.pageTitle}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Grid>
      </div>
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
