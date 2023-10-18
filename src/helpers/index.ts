// Pure functions that can be executed anywhere (NodeJS, browser)
import { DateTime } from 'luxon'

import type {
  RSSNewsItem,
  NewsItemArticle,
  ArticleListItemRecord,
  PublishableItemType,
  SessionUser,
} from 'types'

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

/** check if an object with publishedDate and status is Published */
export const isPublished = (
  publishableItem: PublishableItemType | undefined
) => {
  if (
    publishableItem &&
    publishableItem.status === 'Published' &&
    DateTime.fromISO(publishableItem.publishedDate) <= DateTime.now()
  ) {
    return true
  }
  return false
}

/** check if a user is in the CMS user groups */
export const isCmsUser = (user: SessionUser | undefined) => {
  if (
    user &&
    (user.attributes.userGroups.includes('PORTAL_CMS_Users') ||
      user.attributes.userGroups.includes('PORTAL_CMS_Admins'))
  ) {
    return true
  }
  return false
}

/** Extract YouTube embed ID from url */
export const getYouTubeEmbedId = (url: string) => {
  let embedId = ''
  const parsedUrl = (url || '')
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if (parsedUrl[2] !== undefined) {
    const parsedId = parsedUrl[2].split(/[^0-9a-z_-]/i)
    embedId = parsedId[0]
  } else {
    embedId = url
  }
  return embedId
}

/** Convert a string to title case */
export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
