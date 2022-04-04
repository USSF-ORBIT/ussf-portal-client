import React, { useEffect } from 'react'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
  Grid,
} from '@trussworks/react-uswds'

import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import Loader from 'components/Loader/Loader'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import { useUser } from 'hooks/useUser'
import LinkTo from 'components/util/LinkTo/LinkTo'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import NewsListItem from 'components/NewsListItem/NewsListItem'
import { useRSSFeed } from 'hooks/useRSSFeed'
import styles from 'styles/pages/news.module.scss'
import type { RSSNewsItem } from 'types'
import { validateNewsItems, formatRssToArticle } from 'helpers/index'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'

const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=12`

const News = () => {
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
    <div>
      <div className={styles.pageTitle}>
        <h2>Latest news</h2>
        <h3>The most recently publicly released Space Force news.</h3>
      </div>
      <Grid row gap={2}>
        {!items.length && (
          <>
            <Grid desktop={{ col: 6 }}>
              <LoadingWidget />
            </Grid>
            <Grid desktop={{ col: 6 }}>
              <LoadingWidget />
            </Grid>
          </>
        )}

        {items
          .filter(validateNewsItems)
          .map((item) => formatRssToArticle(item as Required<RSSNewsItem>))
          .map((item, i) => (
            <Grid
              key={`newsItem_${i}_${item.id}`}
              tablet={{ col: 6 }}
              className={styles.newsItemContainer}>
              <NewsListItem article={item} />
            </Grid>
          ))}
      </Grid>

      <div style={{ textAlign: 'center' }}>
        <LinkTo
          href="https://www.spaceforce.mil/News"
          target="_blank"
          rel="noreferrer noopener"
          className="usa-button">
          Read more news
        </LinkTo>
      </div>
    </div>
  )
}

export default News

News.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>News</h1>
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>News</Breadcrumb>
      </BreadcrumbBar>
    </div>,
    page
  )
