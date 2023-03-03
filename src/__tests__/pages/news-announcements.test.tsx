/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../testHelpers'

import { cmsAnnouncementsMock as mockAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import { cmsPortalNewsArticlesMock as mockArticles } from '../../__fixtures__/data/cmsPortalNewsArticles'
import { mockRssFeedTen } from '__mocks__/news-rss'
import '../../__mocks__/mockMatchMedia'
import NewsAnnouncements, { getServerSideProps } from 'pages/news-announcements'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          announcements: mockAnnouncements,
          articles: mockArticles,
        },
      }
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
          announcements={mockAnnouncements}
          articles={mockArticles}
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

    it('returns correct props from getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockAnnouncements,
          articles: mockArticles,
        },
      })
    })
    it('renders the page title and RSS items', async () => {
      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockRssFeedTen })
      })

      renderWithAuth(
        <NewsAnnouncements
          announcements={mockAnnouncements}
          articles={mockArticles}
        />
      )

      // Slider component in react-slick clones each item in the carousel,
      // so a length of 2 is accurate
      expect(screen.getAllByText('Test Announcement')).toHaveLength(2)

      expect(screen.getByText('Latest external USSF news')).toBeInTheDocument()

      const allArticles = await screen.findAllByRole('article')
      expect(allArticles[0]).toContainHTML('article')
    })

    it('withLayout returns correct title and navigation', async () => {
      const result = NewsAnnouncements.getLayout('page')

      expect(result.props.header.props.children).toEqual([
        // eslint-disable-next-line
        <h1>News & Announcements</h1>,
        // this is inexplicably throwing a lint error for missing key
        // even though this exactly the data passed to withLayout
        // eslint-disable-next-line react/jsx-key
        <BreadcrumbNav
          navItems={[
            { label: 'Service portal home', path: '/' },
            {
              current: true,
              label: 'News & Announcements',
              path: '/news-announcements',
            },
          ]}
        />,
      ])
    })
  })
})
