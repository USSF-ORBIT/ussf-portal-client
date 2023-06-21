import { InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'
import { Grid } from '@trussworks/react-uswds'
import { DateTime } from 'luxon'
import { client } from '../lib/keystoneClient'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import Announcement from 'components/Announcement/Announcement'
import NewsCarousel from 'components/NewsCarousel/NewsCarousel'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useRSSFeed } from 'hooks/useRSSFeed'
import styles from 'styles/pages/news.module.scss'
import type { RSSNewsItem } from 'types'
import { validateNewsItems, formatToArticleListItem } from 'helpers/index'
import { GET_ANNOUNCEMENTS } from 'operations/cms/queries/getAnnouncements'
import { GET_INTERNAL_NEWS_CAROUSEL_ARTICLES } from 'operations/cms/queries/getInternalNewsCarouselArticles'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import { ArticleList } from 'components/ArticleList/ArticleList'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'

const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=4`

const NewsAnnouncements = ({
  announcements,
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  const { items, fetchItems } = useRSSFeed(RSS_URL)

  useEffect(() => {
    if (user) {
      fetchItems()
    }
  }, [user])

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.listContainer}>
      {announcements.length > 0 && (
        <section>
          <Announcement announcements={announcements} />
        </section>
      )}

      {articles.length > 0 && (
        <section className={styles.newsCarouselSection}>
          <NewsCarousel articles={articles} />
        </section>
      )}

      {/* 
      This is separate from the NewsCarousel render above because the 
      react-slick library uses certain styles for the dots section of 
      the carousel that interfere with margin and padding.
      */}
      {articles.length > 0 && (
        <div className={styles.olderInternalNewsLink}>
          <LinkTo href="/news" target="_blank" rel="noreferrer noopener">
            <button type="button" className="usa-button">
              View older USSF news
            </button>
          </LinkTo>
        </div>
      )}

      <div className={styles.pageTitle}>
        <h2 id="skip-announcements-carousel">Latest external USSF news</h2>
        <h3>
          Publically released Space Force news released within the last 30 days.
        </h3>
      </div>

      {!items.length ? (
        <Grid col="fill">
          <LoadingWidget />
        </Grid>
      ) : (
        <>
          <ArticleList
            articles={items
              .filter(validateNewsItems)
              .map((item) =>
                formatToArticleListItem(item as Required<RSSNewsItem>)
              )}
          />
          <div className={styles.olderInternalNewsLink}>
            <LinkTo
              href="https://www.spaceforce.mil/News"
              target="_blank"
              rel="noreferrer noopener">
              <button
                type="button"
                className="usa-button usa-button--accent-cool">
                View older Spaceforce.mil articles
              </button>
            </LinkTo>
          </div>
        </>
      )}
    </div>
  )
}

export default NewsAnnouncements

NewsAnnouncements.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>News & Announcements</h1>
      <BreadcrumbNav
        navItems={[
          {
            path: '/',
            label: 'Service portal home',
          },
          {
            path: '/news-announcements',
            label: 'News & Announcements',
            current: true,
          },
        ]}
      />
    </div>,
    page
  )

export async function getServerSideProps() {
  const {
    data: { announcements },
  } = await client.query({
    query: GET_ANNOUNCEMENTS,
    variables: {
      publishedDate: DateTime.now(),
    },
  })

  const {
    data: { articles },
  } = await client.query({
    query: GET_INTERNAL_NEWS_CAROUSEL_ARTICLES,
    variables: {
      publishedDate: DateTime.now(),
    },
  })

  return {
    props: {
      announcements,
      articles,
      pageTitle: 'News & Announcements',
    },
  }
}
