import { InferGetServerSidePropsType } from 'next'
import LandingPageIndexTable from 'components/LandingPageIndexTable/LandingPageIndexTable'
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
      <LandingPageIndexTable landingPages={sortedLandingPages} />
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
