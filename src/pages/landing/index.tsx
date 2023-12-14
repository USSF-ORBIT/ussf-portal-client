import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import LandingPageIndexTable from 'components/LandingPageIndexTable/LandingPageIndexTable'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_LANDING_PAGES } from 'operations/cms/queries/getLandingPages'
import { client } from 'lib/keystoneClient'
import { PublishableItemType } from 'types'
import { isCmsUser, isPublished } from 'helpers/index'
import { getSession } from 'lib/session'

type LandingPage = {
  pageTitle: string
  slug: string
} & PublishableItemType

const Landing = ({
  landingPages,
  showStatus,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>Landing Pages</h1>
      <LandingPageIndexTable
        landingPages={landingPages}
        showStatus={showStatus}
      />
    </div>
  )
}

export default Landing

Landing.getLayout = (page: JSX.Element) => withDefaultLayout(page, false)

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)
  const user = session?.passport?.user

  const {
    data: { landingPages },
  } = await client.query({
    query: GET_LANDING_PAGES,
  })

  // Sort landing pages
  const sortableCopy = [...landingPages]
  if (isCmsUser(user)) {
    const sortedLandingPages = sortableCopy.sort(
      (a: LandingPage, b: LandingPage) => a.pageTitle.localeCompare(b.pageTitle)
    )
    return {
      props: {
        landingPages: sortedLandingPages,
        showStatus: true,
      },
    }
  } else {
    // non cms user filter out draft and archived pages
    const sortedLandingPages = sortableCopy
      .filter(isPublished)
      .sort((a: LandingPage, b: LandingPage) =>
        a.pageTitle.localeCompare(b.pageTitle)
      )
    return {
      props: {
        landingPages: sortedLandingPages,
        showStatus: false,
      },
    }
  }
}
