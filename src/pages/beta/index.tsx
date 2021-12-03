import { useState, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import axios, { AxiosResponse } from 'axios'

import type { BookmarkRecords } from 'types/index'
import MySpace from 'components/MySpace/MySpace'
import { requireAuth } from 'lib/requireAuth'
import { useUser } from 'hooks/useUser'
import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useUser(user)
  const [bookmarks, setBookmarks] = useState<BookmarkRecords>([])

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const response: AxiosResponse<{ bookmarks: BookmarkRecords }> =
          await axios.get('/api/bookmarks')
        setBookmarks(response.data.bookmarks)
      } catch (e) {
        console.error('error getting bookmarks', e)
      }
    }

    loadBookmarks()
  }, [])

  return <MySpace bookmarks={bookmarks} />
}

export default Home

Home.getLayout = withBetaLayout

export const getServerSideProps = requireAuth()
