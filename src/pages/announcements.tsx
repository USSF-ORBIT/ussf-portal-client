import { InferGetServerSidePropsType } from 'next'

import { DateTime } from 'luxon'
import { client } from '../lib/keystoneClient'

import AnnouncementInfo from 'components/AnnouncementInfo/AnnouncementInfo'
import { GET_ANNOUNCEMENTS } from 'operations/cms/queries/getAnnouncements'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import styles from 'styles/pages/annoucements.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { AnnouncementRecord } from 'types'

const AnnouncementsPage = ({
  announcements,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div>
      <div className={styles.pageTitle}>
        {announcements.length > 0 && (
          <section className="grid-row flex-column flex-align-start">
            {announcements.map(
              (announcement: AnnouncementRecord, index: number) => {
                return (
                  <div key={index} className="margin-bottom-3">
                    <AnnouncementInfo key={index} announcement={announcement} />
                  </div>
                )
              }
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default AnnouncementsPage

AnnouncementsPage.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>Latest Announcements</h1>
      <BreadcrumbNav
        navItems={[
          {
            path: '/',
            label: 'Service portal home',
          },
          {
            path: '/announcements',
            label: 'Announcements',
            current: true,
          },
        ]}
      />
    </div>,
    page
  )

export async function getServerSideProps() {
  const {
    data: { announcements },
  } = await client.query({
    query: GET_ANNOUNCEMENTS,
    variables: {
      publishedDate: DateTime.now(),
    },
  })

  return {
    props: {
      announcements,
      pageTitle: 'Latest Announcements',
    },
  }
}
