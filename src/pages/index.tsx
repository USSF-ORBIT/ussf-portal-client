import { InferGetServerSidePropsType } from 'next'
import MySpace from 'components/MySpace/MySpace'
import AnnouncementLaunch from 'components/AnnouncementLaunch/AnnouncementLaunch'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_KEYSTONE_BOOKMARKS } from 'operations/queries/getKeystoneBookmarks'
import styles from 'styles/pages/home.module.scss'
import { client } from '../apolloClient'

const Home = ({
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

Home.getLayout = withDefaultLayout

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_KEYSTONE_BOOKMARKS,
    context: {
      clientName: 'cms',
    },
  })

  return {
    props: {
      bookmarks: data.bookmarks,
    },
  }
}
