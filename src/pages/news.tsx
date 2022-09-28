import { InferGetServerSidePropsType } from 'next'
import { Breadcrumb } from '@trussworks/react-uswds'

import { client } from '../lib/keystoneClient'

import type { ArticleListItemRecord } from 'types'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import { GET_INTERNAL_NEWS_ARTICLES } from 'operations/cms/queries/getInternalNewsArticles'
import { ArticleList } from 'components/ArticleList/ArticleList'
import styles from 'styles/pages/news.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'

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
      <h1>Internal News</h1>
      <BreadcrumbNav
        navItems={[
          {
            path: '/',
            label: <Breadcrumb>Service portal home</Breadcrumb>,
          },
          {
            path: '/news',
            label: <Breadcrumb>Internal News</Breadcrumb>,
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
  })

  return {
    props: {
      articles,
    },
  }
}
