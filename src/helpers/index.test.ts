import { DateTime } from 'luxon'
import { NextApiResponse } from 'next'
import {
  validateNewsItems,
  formatRssToArticle,
  formatToArticleListItem,
  isPublished,
  isCmsUser,
  getYouTubeEmbedId,
  handleRedirectTo,
} from './index'

import type { RSSNewsItem, PublishableItemType } from 'types'
import { PassportRequest } from 'lib/saml'
import { testUser1, cmsAdmin, cmsUser } from '__fixtures__/authUsers'

describe('validateNewsItems', () => {
  test('returns true if the object has all required properties', () => {
    const testItem = {
      id: 'testItemId',
      desc: 'Test item description',
      date: '14 Feb 2022',
      link: 'http://www.example.com',
      title: 'Test Item',
    }

    expect(validateNewsItems(testItem)).toEqual(true)
  })

  test('returns false if the object is missing any of the required properties', () => {
    const testItem = {
      id: 'testItemId',
      desc: 'Test item description',
      date: '14 Feb 2022',
      link: 'http://www.example.com',
      title: 'Test Item',
    }

    expect(validateNewsItems({ ...testItem, id: undefined })).toEqual(false)
    expect(validateNewsItems({ ...testItem, desc: '' })).toEqual(false)
    expect(validateNewsItems({ ...testItem, date: '' })).toEqual(false)
    expect(validateNewsItems({ ...testItem, link: undefined })).toEqual(false)
    expect(validateNewsItems({ ...testItem, title: undefined })).toEqual(false)
  })
})

describe('formatRssToArticle', () => {
  test('maps a valid RSS item to a News List item', () => {
    const rssItem: Required<RSSNewsItem> = {
      id: 'testItemId',
      desc: 'Test item description',
      date: '14 Feb 2022',
      link: 'http://www.example.com',
      title: 'Test Item',
      image: 'https://via.placeholder.com/150',
    }

    const newsItem = {
      id: 'testItemId',
      title: 'Test Item',
      sourceLink: 'http://www.example.com',
      description: 'Test item description',
      publishDate: '14 Feb 2022',
      thumbnailSrc: 'https://via.placeholder.com/150',
      source: 'RSS',
      sourceName: 'SPACEFORCE.mil',
    }

    expect(formatRssToArticle(rssItem)).toStrictEqual(newsItem)
  })
})

describe('formatToArticleListItem', () => {
  test('maps a valid RSS item to an ArticleList item', () => {
    const rssItem: Required<RSSNewsItem> = {
      id: 'testItemId',
      desc: 'Test item description',
      date: '14 Feb 2022',
      link: 'http://www.example.com',
      title: 'Test Item',
      image: 'https://via.placeholder.com/150',
    }

    const articeItem = {
      id: 'testItemId',
      title: 'Test Item',
      sourceLink: 'http://www.example.com',
      preview: 'Test item description',
      publishedDate: '14 Feb 2022',
      source: 'RSS',
      sourceName: 'SPACEFORCE.mil',
    }

    expect(formatToArticleListItem(rssItem)).toStrictEqual(articeItem)
  })
})

describe('isPublished', () => {
  test('returns true if article is published in the past', () => {
    const publishedArticle: PublishableItemType = {
      publishedDate: '2022-05-17T13:44:39.796Z',
      status: 'Published',
    }

    expect(isPublished(publishedArticle)).toBe(true)
  })

  test('returns false if article is published in the future', () => {
    const unpublishedArticle: PublishableItemType = {
      publishedDate: DateTime.now().plus({ weeks: 2 }).toISO()!,
      status: 'Published',
    }
    expect(isPublished(unpublishedArticle)).toBe(false)
  })

  test('returns false if article is not published', () => {
    const unpublishedArticle: PublishableItemType = {
      publishedDate: DateTime.now().plus({ weeks: 2 }).toISO()!,
      status: 'Draft',
    }
    expect(isPublished(unpublishedArticle)).toBe(false)
  })

  test('returns false if article is not published even if publishedDate is in past', () => {
    const unpublishedArticle: PublishableItemType = {
      publishedDate: DateTime.now().minus({ weeks: 2 }).toISO()!,
      status: 'Draft',
    }
    expect(isPublished(unpublishedArticle)).toBe(false)
  })

  test('returns false if article is undefined', () => {
    expect(isPublished(undefined)).toBe(false)
  })
})

describe('isCmsUser', () => {
  test('returns true if user is in CMS_User group', () => {
    expect(isCmsUser(cmsUser)).toBe(true)
  })

  test('returns true if user is in CMS_Admin group', () => {
    expect(isCmsUser(cmsAdmin)).toBe(true)
  })

  test('returns false if user is not in CMS_Admin or CMS_User group', () => {
    expect(isCmsUser(testUser1)).toBe(false)
  })

  test('returns false if article is undefined', () => {
    expect(isCmsUser(undefined)).toBe(false)
  })
})

describe('getYouTubeEmbedId', () => {
  test('returns embed ID from url string', () => {
    // Randomly generated alpha-num id
    const testId = 'EdmbibomN4y'
    const urls = [
      `https://www.youtube.com/watch?v=${testId}`,
      `https://youtu.be/${testId}`,
      `https://youtu.be/${testId}?t=10`,
      `${testId}`,
    ]
    urls.map((url) => {
      expect(getYouTubeEmbedId(url)).toBe(testId)
    })
  })
})

describe('handleRedirectTo', () => {
  test('returns 302 for "/" with RelayState', () => {
    const redirectFn = jest.fn()
    const expectedRedirectTo = '/relay/state'
    const mockReq = {
      body: { RelayState: encodeURIComponent(expectedRedirectTo) },
    } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(302, expectedRedirectTo)
  })

  test('returns 302 for "/" without RelayState', () => {
    const redirectFn = jest.fn()
    const expectedRedirectTo = '/'
    const mockReq = { body: { RelayState: null } } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(302, expectedRedirectTo)
  })

  test('redirect is to / if RelayState not relative path', () => {
    const redirectFn = jest.fn()
    const expectedRedirectTo = 'http://example.com/relay/state'
    const mockReq = {
      body: { RelayState: encodeURIComponent(expectedRedirectTo) },
    } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(302, '/')
  })

  test('redirect is to portal home if KEYSTONE_PUBLIC_URL is unset', () => {
    process.env.KEYSTONE_PUBLIC_URL = ''
    const redirectFn = jest.fn()
    const expectedRedirectTo = '/cms'
    const mockReq = {
      body: { RelayState: encodeURIComponent(expectedRedirectTo) },
    } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(302, '/')
  })

  test('redirect is to CMS public url if RelayState /cms', () => {
    process.env.KEYSTONE_PUBLIC_URL = 'https://cms.example.com'
    const redirectFn = jest.fn()
    const expectedRedirectTo = '/cms'
    const mockReq = {
      body: { RelayState: encodeURIComponent(expectedRedirectTo) },
    } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(
      302,
      process.env.KEYSTONE_PUBLIC_URL
    )
  })

  test('redirect maintains path for cms eg /cms/users', () => {
    process.env.KEYSTONE_PUBLIC_URL = 'https://cms.example.com'
    const redirectFn = jest.fn()
    const expectedRedirectTo = '/cms/users'
    const mockReq = {
      body: { RelayState: encodeURIComponent(expectedRedirectTo) },
    } as PassportRequest
    const mockRes = { redirect: redirectFn } as unknown as NextApiResponse
    handleRedirectTo(mockReq, mockRes)
    expect(redirectFn).toHaveBeenCalledWith(
      302,
      `${process.env.KEYSTONE_PUBLIC_URL}/users`
    )
  })
})
