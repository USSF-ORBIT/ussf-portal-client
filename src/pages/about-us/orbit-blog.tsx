import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'
import { Context, gql } from '@apollo/client'

import { client } from '../../lib/keystoneClient'

import type { ArticleListItemRecord } from 'types'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import { GET_PORTAL_NEWS_ARTICLES } from 'operations/cms/queries/getPortalNewsArticles'
import { ArticleList } from 'components/ArticleList/ArticleList'
import styles from 'styles/pages/news.module.scss'

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
    <div>
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
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/about-us">
            About us
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>ORBIT Blog</Breadcrumb>
      </BreadcrumbBar>
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

  // Get total number of articles from CMS to determine
  // total number of pages
  const {
    data: { articlesCount },
  } = await client.query({
    query: gql`
      query articlesCount {
        articlesCount
      }
    `,
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
    },
  })

  return {
    props: {
      articles,
      currentPage,
      totalPages,
    },
  }
}
