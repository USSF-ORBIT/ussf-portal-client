// Pure functions that can be executed anywhere (NodeJS, browser)
import { DateTime } from 'luxon'
import { PassportRequest } from 'lib/saml'

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

export const handleRedirectTo = (req: PassportRequest) => {
  // Login was successful, redirect back home
  // or redirect to redirectTo if passed in via RelayState

  // RelayState is the parameter that SAML servers understand which will
  // be passed back to us when the auth process is complete. We are using
  // it to store the path to redirect to
  const redirectTo =
    req.body.RelayState && req.body.RelayState !== ''
      ? decodeURIComponent(req.body.RelayState)
      : '/'

  console.debug(`incoming redirectTo: ${redirectTo}`)
  // check for valid places to redirect
  // 1. only allow relative paths e.g. `/news-announcements`
  // 2. only allow correct `/redirect` paths for the redirect page
  if (
    redirectTo.startsWith('/redirect') &&
    process.env.KEYSTONE_PUBLIC_URL &&
    process.env.KEYSTONE_PUBLIC_URL !== ''
  ) {
    // This allows us to support `/redirect/somepath` to be turned into
    // `/redirect?redirectPath=/somepath` which we use to support redirecting
    // to a specific page within keystone. See redirect.tsx
    const finalUrlTo = redirectTo.replace(
      '/redirect',
      '/redirect?redirectPath='
    )
    console.debug(`final redirectTo: ${finalUrlTo}`)
    return finalUrlTo
  } else if (redirectTo !== '/redirect' && redirectTo.startsWith('/')) {
    console.debug(`final redirectTo: ${redirectTo}`)
    return redirectTo
  } else {
    return '/'
  }
}
