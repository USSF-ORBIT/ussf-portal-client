import { InferGetServerSidePropsType } from 'next'

import { DateTime } from 'luxon'
import { client } from '../lib/keystoneClient'

import AnnouncementInfo from 'components/AnnouncementInfo/AnnouncementInfo'
import { GET_ANNOUNCEMENTS } from 'operations/cms/queries/getAnnouncements'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import styles from 'styles/pages/news.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const InternalNews = ({
  announcements,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div>
      <div className={styles.pageTitle}>
        {announcements.length > 0 && (
          <section>
            {announcements.map(
              (announcement: AnnouncementRecord, index: number) => {
                return (
                  <AnnouncementInfo key={index} announcement={announcement} />
                )
              }
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default InternalNews

InternalNews.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>Announcements</h1>
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
    },
  }
}
