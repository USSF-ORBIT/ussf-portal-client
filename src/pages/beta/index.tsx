import { InferGetServerSidePropsType } from 'next'

import { query } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import { requireAuth } from 'lib/requireAuth'
import { useUser } from 'hooks/useUser'
import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'

const Home = ({
  bookmarks,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useUser(user)
  return <MySpace bookmarks={bookmarks} />
}

export default Home

Home.getLayout = withBetaLayout

export const getServerSideProps = requireAuth(async () => {
  const bookmarks: BookmarkRecords = (await query.Bookmark.findMany({
    query: 'id url label',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  return { props: { bookmarks } }
})
