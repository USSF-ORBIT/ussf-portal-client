import { InferGetStaticPropsType } from 'next'

// eslint-disable-next-line import/no-extraneous-dependencies
import { query } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import AnnouncementLaunch from 'components/AnnouncementLaunch/AnnouncementLaunch'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withBetaLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/home.module.scss'

const Home = ({
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user } = useUser()
  return !user ? (
    <Loader />
  ) : (
    <div className={styles.home}>
      <section>
        <AnnouncementLaunch />
      </section>
      <section>
        <MySpace bookmarks={bookmarks} />
      </section>
    </div>
  )
}

export default Home

Home.getLayout = withBetaLayout

export async function getStaticProps() {
  const bookmarks: BookmarkRecords = (await query.Bookmark.findMany({
    query: 'id url label',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  return { props: { bookmarks } }
}
