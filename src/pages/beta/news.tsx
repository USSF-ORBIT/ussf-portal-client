import React, { useEffect } from 'react'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
  Grid,
} from '@trussworks/react-uswds'

import { withPageLayout } from 'layout/Beta/DefaultLayout/PageLayout'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import NewsListItem, {
  NewsListItemArticle,
} from 'components/NewsListItem/NewsListItem'
import { useRSSFeed, RSSNewsItem } from 'hooks/useRSSFeed'
import styles from 'styles/pages/news.module.scss'

const RSS_URL = `https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&max=12`

const validateNewsItems = (item: RSSNewsItem): boolean => {
  return !!(item.id && item.desc && item.date && item.link && item.title)
}

const formatRssToArticle = (
  item: Required<RSSNewsItem>
): NewsListItemArticle => {
  return {
    id: item.id,
    title: item.title,
    sourceLink: item.link,
    description: item.desc,
    publishDate: item.date,
    thumbnailSrc: item.image,
    source: 'RSS',
    sourceName: 'SPACEFORCE.mil',
  }
}

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
      <h2>Latest news</h2>
      <h3>The most recently publicly released Space Force news.</h3>

      <Grid row gap={2}>
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
