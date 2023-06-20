import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Context } from '@apollo/client'

import { DateTime } from 'luxon'
import { client } from '../../lib/keystoneClient'

import type { ArticleListItemRecord } from 'types'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import {
  GET_PORTAL_NEWS_ARTICLES,
  GET_ARTICLES_COUNT,
} from 'operations/cms/queries/getPortalNewsArticles'
import { ArticleList } from 'components/ArticleList/ArticleList'
import styles from 'styles/pages/news.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

// The Dev Blog
const PortalNews = ({
  articles,
  currentPage,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.listContainer}>
      <div className={styles.pageTitle}>
        <h2>Production team blog & announcements</h2>
        <h3>
          Here’s what we’re working on and planning in latest portal updates &
          releases.
        </h3>
      </div>

      <ArticleList
        articles={articles}
        pagination={{ totalPages, currentPage }}
      />
    </div>
  )
}

export default PortalNews

PortalNews.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>ORBIT Blog</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: 'Service portal home' },
          { path: '/about-us', label: 'About Us' },
          {
            path: '/orbit-blog',
            label: 'ORBIT Blog',
            current: true,
          },
        ]}
      />
    </div>,
    page
  )

export const getServerSideProps: GetServerSideProps = async (
  context: Context
) => {
  // Determine page based on url query ?page=INT
  // Set articles per page we want to display
  // If no query or an invalid param, return page 1
  const currentPage = parseInt(context.query.page) || 1

  const articlesPerPage = 10

  const currentDateTime = DateTime.now()

  // Get total number of articles from CMS to determine
  // total number of pages
  const {
    data: { articlesCount },
  } = await client.query({
    query: GET_ARTICLES_COUNT,
    variables: {
      publishedDate: currentDateTime,
    },
  })
  // Calculate total pages
  // If NaN, return 1 page
  const totalPages = Math.ceil(articlesCount / articlesPerPage) || 1

  // If a page number is requested that's out of range, return 404
  if (currentPage > totalPages) {
    return {
      notFound: true,
    }
  }

  // Get articles based on current page and articles per page
  const {
    data: { articles },
  }: { data: { articles: ArticleListItemRecord[] } } = await client.query({
    query: GET_PORTAL_NEWS_ARTICLES,
    variables: {
      skip: (currentPage - 1) * articlesPerPage,
      take: articlesPerPage,
      publishedDate: currentDateTime,
    },
  })

  return {
    props: {
      articles,
      currentPage,
      totalPages,
      pageTitle: 'Orbit Blog',
    },
  }
}
