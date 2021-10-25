import { ReactNode } from 'react'
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import { connect } from '../../mongodb'

import { lists } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import MySpace from 'components/MySpace/MySpace'

const Home = ({
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <MySpace bookmarks={bookmarks} />
)

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout

export async function getServerSideProps() {
  const bookmarks: BookmarkRecords = (await lists.Bookmark.findMany({
    query: 'id url label',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  // Connect to MongoDB -- for testing only
  await connect()

  // return props
  return {
    props: { bookmarks },
  }
}
