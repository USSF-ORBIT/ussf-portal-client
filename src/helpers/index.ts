// Pure functions that can be executed anywhere (NodeJS, browser)

import type { RSSNewsItem, NewsItemArticle, ArticleListItemRecord } from 'types'

/** Validate items from an RSS feed by checking for required attributes */
export const validateNewsItems = (item: RSSNewsItem): boolean => {
  return !!(item.id && item.desc && item.date && item.link && item.title)
}

/** Convert RSS items to article object expected by NewsItem component */
export const formatRssToArticle = (
  item: Required<RSSNewsItem>
): NewsItemArticle => {
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

/** Convert RSS items to article object expected by ArticleList component */
export const formatToArticleListItem = (
  item: Required<RSSNewsItem>
): ArticleListItemRecord => {
  return {
    id: item.id,
    title: item.title,
    sourceLink: item.link,
    preview: item.desc,
    publishedDate: item.date,
    source: 'RSS',
    sourceName: 'SPACEFORCE.mil',
  }
}
