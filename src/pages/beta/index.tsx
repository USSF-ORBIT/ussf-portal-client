import { ReactNode } from 'react'

import { lists } from '.keystone/api'

import type { BookmarkRecords } from 'types/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import MySpace from 'components/MySpace/MySpace'
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
/* eslint-disable */
import clientPromise from '../../utils/connection'

const Home = ({
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <MySpace bookmarks={bookmarks} />
)

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout

// export async function getStaticProps() {
//   const bookmarks: BookmarkRecords = (await lists.Bookmark.findMany({
//     query: 'id url label',
//     orderBy: [{ label: 'asc' }],
//   })) as BookmarkRecords

//   return { props: { bookmarks } }
// }

export async function getServerSideProps() {
  const bookmarks: BookmarkRecords = (await lists.Bookmark.findMany({
    query: 'id url label',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  const client: Promise<MongoClient> = await clientPromise

  5
  6
  return { props: { bookmarks } }
}
