import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import AnnouncementLaunch from 'components/AnnouncementLaunch/AnnouncementLaunch'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { gql, useQuery } from '@apollo/client'
import styles from 'styles/pages/home.module.scss'

const Home = () => {
  const { user } = useUser()

  const {
    loading: cmsBookmarksLoading,
    error: cmsBookmarksError,
    data: cmsBookmarks,
  } = useQuery(GET_KEYSTONE_BOOKMARKS, {
    context: {
      clientName: 'cms',
    },
  })

  const bookmarks = cmsBookmarks?.bookmarks as BookmarkRecords

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

const GET_KEYSTONE_BOOKMARKS = gql`
  query GetKeystoneBookmarks {
    bookmarks {
      id
      url
      label
    }
  }
`
