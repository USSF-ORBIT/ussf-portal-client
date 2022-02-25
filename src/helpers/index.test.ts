import { validateNewsItems, formatRssToArticle } from './index'

import type { RSSNewsItem } from 'types'

describe('validateNewsItems', () => {
  it('returns true if the object has all required properties', () => {
    const testItem = {
      id: 'testItemId',
      desc: 'Test item description',
      date: '14 Feb 2022',
      link: 'http://www.example.com',
      title: 'Test Item',
    }

    expect(validateNewsItems(testItem)).toEqual(true)
  })

  it('returns false if the object is missing any of the required properties', () => {
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
  it('maps a valid RSS item to a News List item', () => {
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
