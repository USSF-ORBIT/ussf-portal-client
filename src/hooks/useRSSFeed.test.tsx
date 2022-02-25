/**
 * @jest-environment jsdom
 */
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'

import { useRSSFeed } from './useRSSFeed'

import mockRssFeed from '__mocks__/news-rss'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementation(() => {
  return Promise.resolve({ data: mockRssFeed })
})

const MOCK_RSS_URL = 'MOCK_RSS_URL'

describe('useRSSFeed hook', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear()
  })

  it('returns the item state and a method for fetching items', () => {
    const { result } = renderHook(() => useRSSFeed(MOCK_RSS_URL))

    expect(result.current.items).toEqual([])
    expect(result.current.fetchItems).toBeTruthy()
  })

  it('fetching the items sets them in state', async () => {
    const { result } = renderHook(() => useRSSFeed(MOCK_RSS_URL))

    await waitFor(() => {
      result.current.fetchItems()
    })

    expect(mockedAxios.get).toHaveBeenCalledWith(MOCK_RSS_URL)

    expect(result.current.items.length).toBe(10)
    expect(result.current.items[0]).toMatchObject({
      id: 'https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/',
      title: 'Senate confirms Gina Ortiz Jones to be Air Force Under Secretary',
      link: 'https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/',
      desc: 'In explaining the basis for choosing Jones, the White House highlighted that she was commissioned through the Air Force ROTC program while a student at Boston University and “has spent her career working to protect U.S. economic and national security.”',
      date: 'Jul 23, 2021',
      image:
        'https://media.defense.gov/2021/May/19/2002809800/670/394/0/210519-F-GO452-0001.JPG',
    })
  })

  describe('with an empty item', () => {
    it('returns an empty article', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: `<?xml version="1.0" encoding="utf-8"?>\r\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cf="http://www.microsoft.com/schemas/rss/core/2005">\r\n <channel>
    \r\n <title>United States Space Force News</title>\r\n
    <link>https://www.spaceforce.mil</link>\r\n <description>United States Space Force News RSS Feed</description>\r\n
    <language>en-us</language>\r\n <pubDate>Fri, 23 Jul 2021 15:29:00 GMT</pubDate>\r\n <lastBuildDate>Mon, 26 Jul 2021
      14:05:50 GMT</lastBuildDate>\r\n
    <atom:link
      href="http://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&amp;Site=1060&amp;max=10?ContentType=1&amp;Site=1060&amp;isdashboardselected=0&amp;max=10"
      rel="self" type="application/rss+xml" />\r\n <item>\r\n <link></link>\r\n<description>This is an empty article</description>\r\n<pubDate></pubDate>\r\n<title></title>\r\n
      \r\n <dc:creator>DoD News</dc:creator>\r\n <guid isPermaLink="false">https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/</guid>\r\n
      <enclosure url="https://media.defense.gov/2021/May/19/2002809800/670/394/0/210519-F-GO452-0001.JPG"
        type="image/jpeg" />\r\n
    </item>\r\n 
  </channel>\r\n</rss>
`,
      })

      const { result } = renderHook(() => useRSSFeed(MOCK_RSS_URL))

      await waitFor(() => {
        result.current.fetchItems()
      })

      expect(mockedAxios.get).toHaveBeenCalledWith(MOCK_RSS_URL)

      expect(result.current.items.length).toBe(1)
      expect(result.current.items[0]).toMatchObject({
        id: 'https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/',
        title: '',
        link: '',
        desc: 'This is an empty article',
        date: '',
        image:
          'https://media.defense.gov/2021/May/19/2002809800/670/394/0/210519-F-GO452-0001.JPG',
      })
    })
  })

  it('logs the error if the RSS fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error')

    mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching RSS'))

    const { result } = renderHook(() => useRSSFeed(MOCK_RSS_URL))

    await waitFor(() => {
      result.current.fetchItems()
    })

    waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching RSS feed')
    )
  })
})
