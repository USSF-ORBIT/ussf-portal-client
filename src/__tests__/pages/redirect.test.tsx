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
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'
import Redirect, { getServerSideProps } from 'pages/redirect'

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

      renderWithAuth(<Redirect redirectTo="" />, {})
    })

    test('renders the loader while fetching the user and does not fetch RSS items', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    describe('getServerSideProps', () => {
      test('returns correct props', async () => {
        process.env.KEYSTONE_PUBLIC_URL = 'https://cms.example.com'
        const context = {
          query: {
            redirectPath: '',
          },
        }
        const response = await getServerSideProps(context)

        expect(response).toEqual({
          props: {
            redirectTo: process.env.KEYSTONE_PUBLIC_URL,
            pageTitle: 'Redirect',
          },
        })
      })

      test('returns correct props if redirectPath set', async () => {
        process.env.KEYSTONE_PUBLIC_URL = 'https://cms.example.com'
        const context = {
          query: {
            redirectPath: '/users',
          },
        }
        const response = await getServerSideProps(context)

        expect(response).toEqual({
          props: {
            redirectTo: `${process.env.KEYSTONE_PUBLIC_URL}/users`,
            pageTitle: 'Redirect',
          },
        })
      })

      test('returns notFound if keystone url set to empty', async () => {
        process.env.KEYSTONE_PUBLIC_URL = ''
        const context = {
          query: {
            redirectPath: '/users',
          },
        }
        const response = await getServerSideProps(context)

        expect(response).toEqual({
          notFound: true,
        })
      })
    })

    test('renders the page title and redirect content', async () => {
      const expectedUrl = 'https://cms.example.com'
      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockRssFeedTen })
      })

      renderWithAuth(<Redirect redirectTo="https://cms.example.com" />)

      expect(screen.getByRole('link', { name: expectedUrl })).toBeVisible()
      expect(screen.getByRole('link', { name: expectedUrl })).toHaveAttribute(
        'href',
        'https://cms.example.com'
      )
      expect(screen.getByRole('heading', { name: 'Redirect' })).toBeVisible()
    })
  })
})
