/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'

import { DateTime } from 'luxon'
import { renderWithAuth } from '../../testHelpers'
import { client } from '../../lib/keystoneClient'

import { cmsOrbitBlogArticle as mockOrbitBlogArticle } from '../../__fixtures__/data/cmsOrbitBlogArticle'
import { cmsInternalNewsArticle } from '../../__fixtures__/data/cmsInternalNewsArticle'

import SingleArticlePage, { getServerSideProps } from 'pages/articles/[article]'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1, cmsUser } from '__fixtures__/authUsers'
import { getSession } from 'lib/session'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: jest.fn(() => {
      return {
        data: {
          article: mockOrbitBlogArticle,
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
  jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
    return {
      user: testUser1,
      portalUser: testPortalUser1,
      loading: false
    }
  })
})

describe('Single article getServerSideProps', () => {
  const testContext = {
    query: { article: 'test-article-slug' },
  } as unknown as GetServerSidePropsContext

  describe('as portal user', () => {
    test('returns the article prop if the query returns a published article', async () => {
      const response = await getServerSideProps(testContext)
      expect(response).toEqual({
        props: {
          article: mockOrbitBlogArticle,
          pageTitle: mockOrbitBlogArticle.title,
        },
      })
    })

    test('returns not found if the query returns an unpublished article', async () => {
      mockedKeystoneClient.query.mockResolvedValueOnce({
        data: {
          article: { ...mockOrbitBlogArticle, status: 'Draft' },
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
            ...mockOrbitBlogArticle,
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
  })

  describe('as cms user', () => {
    beforeEach(() => {
      mockedGetSession.mockReset()
      mockedGetSession.mockImplementationOnce(() =>
        Promise.resolve({ passport: { user: cmsUser } })
      )
    })

    test('returns found if the query returns an unpublished article', async () => {
      const draftArticle = { ...mockOrbitBlogArticle, status: 'Draft' }
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
          pageTitle: mockOrbitBlogArticle.title,
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

describe('Single article page', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: null,
          portalUser: null,
          loading: true
        }
      })
      renderWithAuth(<SingleArticlePage article={mockOrbitBlogArticle} />, {})
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('renders an ORBIT Blog article', async () => {
      renderWithAuth(<SingleArticlePage article={mockOrbitBlogArticle} />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('ORBIT Blog')
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('Announcing the dev blog')

      expect(await screen.findAllByRole('article')).toHaveLength(1)
    })

    test('renders an Internal News article', async () => {
      renderWithAuth(<SingleArticlePage article={cmsInternalNewsArticle} />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('News')
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('USSF Internal News Article')

      expect(await screen.findAllByRole('article')).toHaveLength(1)
    })
  })
})
