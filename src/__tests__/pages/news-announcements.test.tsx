/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../testHelpers'

import { cmsAnnouncementsMock as mockAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import { cmsPortalNewsArticlesMock as mockArticles } from '../../__fixtures__/data/cmsPortalNewsArticles'
import { mockRssFeedTen } from '__mocks__/news-rss'
import '../../__mocks__/mockMatchMedia'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import NewsAnnouncements, { getServerSideProps } from 'pages/news-announcements'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

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

beforeEach(() => {
  mockedAxios.get.mockClear()
  jest
    .spyOn(useUserHooks, 'useUser')
    .mockImplementation((): MockedImplementation => {
      return {
        user: testUser1,
        portalUser: testPortalUser1 as GetUserQuery,
        loading: false,
      }
    })
})

describe('News page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest
        .spyOn(useUserHooks, 'useUser')
        .mockImplementation((): MockedImplementation => {
          return {
            user: null,
            portalUser: undefined,
            loading: true,
          }
        })

      renderWithAuth(
        <NewsAnnouncements
          announcements={mockAnnouncements}
          articles={mockArticles}
          pageTitle="News & Announcements"
        />,
        {}
      )
    })

    test('renders the loader while fetching the user and does not fetch RSS items', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('returns correct props from getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockAnnouncements,
          articles: mockArticles,
          pageTitle: 'News & Announcements',
        },
      })
    })

    test('renders the page title and RSS items', async () => {
      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockRssFeedTen })
      })

      renderWithAuth(
        <NewsAnnouncements
          announcements={mockAnnouncements}
          articles={mockArticles}
          pageTitle="News & Announcements"
        />
      )

      // Slider component in react-slick clones each item in the carousel,
      // so a length of 2 is accurate
      expect(screen.getAllByText('Test Announcement')).toHaveLength(2)

      expect(screen.getByText('Latest external USSF news')).toBeInTheDocument()

      const allArticles = await screen.findAllByRole('article')
      expect(allArticles[0]).toContainHTML('article')
    })

    test('withLayout returns correct title and navigation', async () => {
      const result = NewsAnnouncements.getLayout('page')

      // this array is inexplicably throwing a lint error for missing keys
      // even though the data matches what we pass in to withLayout()
      expect(result.props.header.props.children).toEqual([
        // eslint-disable-next-line react/jsx-key
        <h1>News & Announcements</h1>,

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
