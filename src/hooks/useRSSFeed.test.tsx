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

  // TODO - error?
})
