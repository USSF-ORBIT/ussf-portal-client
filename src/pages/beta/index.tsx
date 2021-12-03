import { InferGetStaticPropsType } from 'next'

import { query } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import Loader from 'components/Loader'
import { useUser } from 'hooks/useUser'
import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'

const Home = ({
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user } = useUser()
  return !user ? <Loader /> : <MySpace bookmarks={bookmarks} />
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
