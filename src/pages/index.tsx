import { useEffect } from 'react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

// eslint-disable-next-line import/no-extraneous-dependencies
import { query } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import AnnouncementLaunch from 'components/AnnouncementLaunch/AnnouncementLaunch'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/home.module.scss'

const Home = ({
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    const redirectAfterLogin =
      window.sessionStorage.getItem('redirectAfterLogin')

    if (redirectAfterLogin) {
      window.sessionStorage.removeItem('redirectAfterLogin')
      router.push(redirectAfterLogin)
    }
  }, [])

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

Home.getLayout = withDefaultLayout

export async function getStaticProps() {
  const bookmarks: BookmarkRecords = (await query.Bookmark.findMany({
    query: 'id url label',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  return { props: { bookmarks } }
}
