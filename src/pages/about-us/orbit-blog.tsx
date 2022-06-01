import { InferGetServerSidePropsType } from 'next'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'

import { client } from '../../lib/keystoneClient'

import type { ArticleListItemRecord } from 'types'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import { GET_PORTAL_NEWS_ARTICLES } from 'operations/queries/cms/getPortalNewsArticles'
import { ArticleList } from 'components/ArticleList/ArticleList'
import styles from 'styles/pages/news.module.scss'

// The Dev Blog
const PortalNews = ({
  articles,
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

      <ArticleList articles={articles} />
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

export async function getServerSideProps() {
  const {
    data: { articles },
  }: { data: { articles: ArticleListItemRecord[] } } = await client.query({
    query: GET_PORTAL_NEWS_ARTICLES,
  })

  return {
    props: {
      articles,
    },
  }
}
