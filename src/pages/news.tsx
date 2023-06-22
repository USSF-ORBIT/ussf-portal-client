import { InferGetServerSidePropsType } from 'next'

import { DateTime } from 'luxon'
import { client } from '../lib/keystoneClient'

import type { ArticleListItemRecord } from 'types'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import { GET_INTERNAL_NEWS_ARTICLES } from 'operations/cms/queries/getInternalNewsArticles'
import { ArticleList } from 'components/ArticleList/ArticleList'
import styles from 'styles/pages/news.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const InternalNews = ({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div>
      <div className={styles.pageTitle}>
        <h2>All USSF news</h2>
        <h3>
          Publically and internally released Space Force news, published within
          the last 30 days.
        </h3>
      </div>

      <ArticleList articles={articles} />
    </div>
  )
}

export default InternalNews

InternalNews.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>News</h1>
      <BreadcrumbNav
        navItems={[
          {
            path: '/',
            label: 'Service portal home',
          },
          {
            path: '/about-us',
            label: 'About Us',
          },
          {
            path: '/news',
            label: 'News',
            current: true,
          },
        ]}
      />
    </div>,
    page
  )

export async function getServerSideProps() {
  const {
    data: { articles },
  }: { data: { articles: ArticleListItemRecord[] } } = await client.query({
    query: GET_INTERNAL_NEWS_ARTICLES,
    variables: {
      publishedDate: DateTime.now(),
    },
  })

  return {
    props: {
      articles,
      pageTitle: 'Internal News',
    },
  }
}
