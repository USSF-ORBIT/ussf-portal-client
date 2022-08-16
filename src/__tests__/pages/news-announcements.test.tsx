/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../testHelpers'

import { cmsAnnouncementsMock } from '../../__fixtures__/data/cmsAnnouncments'
import { cmsPortalNewsArticlesMock } from '../../__fixtures__/data/cmsPortalNewsArticles'
import mockRssFeed from '__mocks__/news-rss'
import '../../__mocks__/mockMatchMedia'
import NewsAnnouncements from 'pages/news-announcements'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return
    },
  },
}))
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: mockPush,
  replace: mockReplace,
})

describe('News page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest.useFakeTimers()

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      renderWithAuth(
        <NewsAnnouncements
          announcements={cmsAnnouncementsMock}
          articles={cmsPortalNewsArticlesMock}
        />,
        { user: null }
      )
    })

    it('renders the loader while fetching the user and does not fetch RSS items', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      mockedAxios.get.mockClear()
    })

    it('renders the page title and RSS items', async () => {
      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockRssFeed })
      })

      renderWithAuth(
        <NewsAnnouncements
          announcements={cmsAnnouncementsMock}
          articles={cmsPortalNewsArticlesMock}
        />
      )

      // Slider component in react-slick clones each item in the carousel,
      // so a length of 2 is accurate
      expect(screen.getAllByText('Test Announcement')).toHaveLength(2)

      expect(screen.getByText('All USSF news')).toBeInTheDocument()

      expect(await screen.findAllByRole('article')).toHaveLength(4)
    })
  })
})
