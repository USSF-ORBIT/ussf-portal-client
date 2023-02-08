/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'

import { DateTime } from 'luxon'
import { renderWithAuth } from '../../testHelpers'
import { client } from '../../lib/keystoneClient'

import { cmsOrbitBlogArticle as mockOrbitBlogArticle } from '../../__fixtures__/data/cmsOrbitBlogArticle'
import { cmsInternalNewsArticle } from '../../__fixtures__/data/cmsInternalNewsArticle'

import SingleArticlePage, { getServerSideProps } from 'pages/articles/[article]'

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

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

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

describe('Single article getServerSideProps', () => {
  const testContext = {
    query: { article: 'test-article-slug' },
  } as unknown as GetServerSidePropsContext

  it('returns the article prop if the query returns a published article', async () => {
    const response = await getServerSideProps(testContext)
    expect(response).toEqual({
      props: {
        article: mockOrbitBlogArticle,
      },
    })
  })

  it('returns not found if the query returns an unpublished article', async () => {
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

  it('returns not found if the query returns an article published in the future', async () => {
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

  it('returns not found if no article is found by the query', async () => {
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

describe('Single article page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<SingleArticlePage article={mockOrbitBlogArticle} />, {
        user: null,
      })
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    it('renders an ORBIT Blog article', async () => {
      renderWithAuth(<SingleArticlePage article={mockOrbitBlogArticle} />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('ORBIT Blog')
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('Announcing the dev blog')

      expect(await screen.findAllByRole('article')).toHaveLength(1)
    })

    it('renders an Internal News article', async () => {
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
