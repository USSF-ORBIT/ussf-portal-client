import { InferGetServerSidePropsType } from 'next'

import { client } from '../lib/keystoneClient'

import MySpace from 'components/MySpace/MySpace'
import Announcement from 'components/Announcement/Announcement'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import type { BookmarkRecords, AnnouncementRecord } from 'types/index'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_ANNOUNCEMENTS } from 'operations/cms/queries/getAnnouncements'
import { GET_KEYSTONE_BOOKMARKS } from 'operations/cms/queries/getKeystoneBookmarks'
import styles from 'styles/pages/home.module.scss'

const Home = ({
  bookmarks,
  announcements,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.home}>
      {announcements.length > 0 && (
        <section>
          <Announcement announcements={announcements} />
        </section>
      )}

      <section>
        <MySpace bookmarks={bookmarks} />
      </section>
    </div>
  )
}

export default Home

Home.getLayout = withDefaultLayout

export async function getServerSideProps() {
  const { data: cmsBookmarks } = await client.query({
    query: GET_KEYSTONE_BOOKMARKS,
  })

  const {
    data: { announcements },
  } = await client.query({
    query: GET_ANNOUNCEMENTS,
  })

  const bookmarks = cmsBookmarks?.bookmarks as BookmarkRecords

  return {
    props: {
      bookmarks,
      announcements,
    },
  }
}
