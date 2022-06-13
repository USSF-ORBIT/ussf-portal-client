import { InferGetServerSidePropsType } from 'next'

import { client } from '../lib/keystoneClient'

import MySpace from 'components/MySpace/MySpace'
import Announcement from 'components/Announcement/Announcement'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import type { BookmarkRecords } from 'types/index'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_KEYSTONE_BOOKMARKS } from 'operations/cms/queries/getKeystoneBookmarks'
import styles from 'styles/pages/home.module.scss'

const Home = ({
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.home}>
      <section>
        <Announcement />
      </section>
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

  const bookmarks = cmsBookmarks?.bookmarks as BookmarkRecords

  return {
    props: {
      bookmarks,
    },
  }
}
