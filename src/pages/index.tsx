import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { DateTime } from 'luxon'
import { client } from '../lib/keystoneClient'
import clientPromise from 'lib/mongodb'
import { getSession } from 'lib/session'
import MySpace from 'components/MySpace/MySpace'
import Announcement from 'components/Announcement/Announcement'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import type { BookmarkRecords, PortalUser } from 'types/index'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GET_ANNOUNCEMENTS } from 'operations/cms/queries/getAnnouncements'
import { GET_KEYSTONE_BOOKMARKS } from 'operations/cms/queries/getKeystoneBookmarks'
import styles from 'styles/pages/home.module.scss'

const Home = ({
  bookmarks,
  announcements,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { user } = useUser()
  console.log(user)

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res)
  const user = session?.passport?.user
  console.log(user)

  // Connecting in a similar way that Apollo Server is src/pages/api/graphql.tsx
  // Maybe this needs to be in a tyr/catch?
  // const mongoClient = await clientPromise
  // const db = mongoClient.db(process.env.MONGODB_DB)
  // const foundUser = (await db
  //   .collection('users')
  //   .findOne({ userId: user.userId })) as PortalUser

  // console.log(foundUser)

  const { data: cmsBookmarks } = await client.query({
    query: GET_KEYSTONE_BOOKMARKS,
  })

  const {
    data: { announcements },
  } = await client.query({
    query: GET_ANNOUNCEMENTS,
    variables: {
      publishedDate: DateTime.now(),
    },
  })

  const bookmarks = cmsBookmarks?.bookmarks as BookmarkRecords

  return {
    props: {
      bookmarks,
      announcements,
      // user: foundUser,
    },
  }
}
