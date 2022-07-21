// Pure functions that can be executed anywhere (NodeJS, browser)

import type {
  RSSNewsItem,
  NewsListItemArticle,
  ArticleListItemRecord,
} from 'types'

/** Validate items from an RSS feed by checking for required attributes */
export const validateNewsItems = (item: RSSNewsItem): boolean => {
  return !!(item.id && item.desc && item.date && item.link && item.title)
}

/** Convert RSS items to article object expected by NewsListItem component */
export const formatRssToArticle = (
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

/** Convert RSS items to article object expected by ArticleList component */
export const formatToArticleListItem = (
  item: Required<RSSNewsItem>
): ArticleListItemRecord => {
  return {
    id: item.id,
    title: item.title,
    slug: item.link,
    preview: item.desc,
    publishedDate: item.date,
    source: 'RSS',
    sourceName: 'SPACEFORCE.mil',
  }
}
