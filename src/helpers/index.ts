// Pure functions that can be executed anywhere (NodeJS, browser)

import type { RSSNewsItem, NewsListItemArticle } from 'types'

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

export const formatKeystonePublishTime = (
  publishedDate: string | undefined
) => {
  const d = new Date(publishedDate)
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]

  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  const hour = d.getHours()
  const minute = d.getMinutes()

  // TO DO: add check for today

  return `${date} ${month} ${year} at ${hour}:${minute}`
}
