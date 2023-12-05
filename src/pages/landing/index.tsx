import { InferGetServerSidePropsType } from 'next'
import { isPublished } from '../../helpers'
import LandingPageIndexTable from 'components/LandingPageIndexTable/LandingPageIndexTable'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_LANDING_PAGES } from 'operations/cms/queries/getLandingPages'
import { client } from 'lib/keystoneClient'
import { PublishableItemType } from 'types'

type LandingPage = {
  pageTitle: string
  slug: string
} & PublishableItemType

const Landing = ({
  landingPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>Landing Pages</h1>
      <LandingPageIndexTable landingPages={landingPages} />
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

  // Filter out draft landing pages
  // TODO: Update this and the landing page table component to show
  // a draft label or something so that CMS users can see the draft
  // page in the list and know it's draft.
  const sortableCopy = [...landingPages]
  const sortedLandingPages = sortableCopy
    .filter(isPublished)
    .sort((a: LandingPage, b: LandingPage) =>
      a.pageTitle.localeCompare(b.pageTitle)
    )
  return {
    props: {
      landingPages: sortedLandingPages,
    },
  }
}
