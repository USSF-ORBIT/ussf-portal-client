/**
 * @jest-environment jsdom
 */
import { screen, render } from '@testing-library/react'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'

import { DateTime } from 'luxon'
import { client } from '../../../../../lib/keystoneClient'

import { cmsLandingPageArticle as mockLandingPageArticle } from '../../../../../__fixtures__/data/cmsLandingPageArticle'

import LandingPageArticle, {
  getServerSideProps,
} from 'pages/landing/[landingPage]/[article]'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1, cmsUser } from '__fixtures__/authUsers'
import { getSession } from 'lib/session'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

jest.mock('../../../../../lib/keystoneClient', () => ({
  client: {
    query: jest.fn(() => {
      return {
        data: {
          article: mockLandingPageArticle,
        },
        loading: false,
        errors: [],
      }
    }),
  },
}))

const mockedKeystoneClient = client as jest.Mocked<typeof client>

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

jest.mock('lib/session', () => ({
  getSession: jest.fn(),
}))

const mockedGetSession = getSession as jest.Mock
mockedGetSession.mockImplementationOnce(() =>
  Promise.resolve({ passport: { user: testUser1 } })
)

beforeEach(() => {
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

describe('LandingPageArticle getServerSideProps', () => {
  const testContext = {
    query: { article: 'test-article-slug' },
  } as unknown as GetServerSidePropsContext

  describe('as portal user', () => {
    test('returns the article prop if the query returns a published article', async () => {
      const response = await getServerSideProps(testContext)
      expect(response).toEqual({
        props: {
          article: mockLandingPageArticle,
          pageTitle: mockLandingPageArticle.title,
        },
      })
    })

    test('returns not found if the query returns an unpublished article', async () => {
      mockedKeystoneClient.query.mockResolvedValueOnce({
        data: {
          article: { ...mockLandingPageArticle, status: 'Draft' },
        },
        loading: false,
        errors: [],
        networkStatus: 7,
      })

      const response = await getServerSideProps(testContext)

      expect(response).toEqual({
        notFound: true,
      })
    })

    test('returns not found if the query returns an article published in the future', async () => {
      const futureDate = DateTime.now().plus({ weeks: 2 })
      mockedKeystoneClient.query.mockResolvedValueOnce({
        data: {
          article: {
            ...mockLandingPageArticle,
            status: 'Published',
            publishedDate: futureDate.toISO(),
          },
        },
        loading: false,
        errors: [],
        networkStatus: 7,
      })

      const response = await getServerSideProps(testContext)

      expect(response).toEqual({
        notFound: true,
      })
    })

    test('renders the article', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/landing/test-landing-page/test-article',
        },
        writable: true,
      })

      render(<LandingPageArticle article={mockLandingPageArticle} />)

      expect(screen.getByText(mockLandingPageArticle.title)).toBeInTheDocument()
    })
  })

  describe('as cms user', () => {
    beforeEach(() => {
      mockedGetSession.mockReset()
      mockedGetSession.mockImplementationOnce(() =>
        Promise.resolve({ passport: { user: cmsUser } })
      )
    })

    test('returns found if the query returns an unpublished article', async () => {
      const draftArticle = { ...mockLandingPageArticle, status: 'Draft' }
      mockedKeystoneClient.query.mockResolvedValueOnce({
        data: {
          article: draftArticle,
        },
        loading: false,
        errors: [],
        networkStatus: 7,
      })

      const response = await getServerSideProps(testContext)

      expect(response).toEqual({
        props: {
          article: draftArticle,
          pageTitle: mockLandingPageArticle.title,
        },
      })
    })

    test('returns not found if the query returns no article', async () => {
      mockedKeystoneClient.query.mockResolvedValueOnce({
        data: {
          article: null,
        },
        loading: false,
        errors: [],
        networkStatus: 7,
      })

      const response = await getServerSideProps(testContext)

      expect(response).toEqual({
        notFound: true,
      })
    })
  })
})
