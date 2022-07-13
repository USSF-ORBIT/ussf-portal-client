/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'

import { renderWithAuth } from '../../testHelpers'

import { mockCmsSearchResults } from '__fixtures__/data/cmsSearch'

import SearchPage, { getServerSideProps } from 'pages/search'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: jest.fn(() => {
      return {
        data: {
          search: mockCmsSearchResults,
        },
        loading: false,
        errors: [],
      }
    }),
  },
}))

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

describe('Search page getServerSideProps', () => {
  it('returns no query and no results if there was no query', async () => {
    const testContext = {
      query: {},
    } as unknown as GetServerSidePropsContext
    const response = await getServerSideProps(testContext)
    expect(response).toEqual({
      props: {
        query: null,
        results: [],
      },
    })
  })

  it('returns the query and results if there was a query', async () => {
    const testContext = {
      query: { q: 'fitness' },
    } as unknown as GetServerSidePropsContext

    const response = await getServerSideProps(testContext)

    expect(response).toEqual({
      props: {
        query: 'fitness',
        results: mockCmsSearchResults.map((r) => ({
          ...r,
          permalink:
            r.type === 'Article'
              ? `http://localhost/articles/${r.permalink}`
              : r.permalink,
        })),
      },
    })
  })
})

describe('Search page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<SearchPage />, {
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
    it('renders an empty state if there is no query', async () => {
      renderWithAuth(<SearchPage />)
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 0 results for ‘’')

      expect(
        screen.getAllByText('There are no results that match that query.')
      ).toHaveLength(1)
    })

    it('renders no results if there were no matches for the query', async () => {
      renderWithAuth(<SearchPage query="nomatches" />)
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 0 results for ‘nomatches’')

      expect(
        screen.getAllByText('There are no results that match that query.')
      ).toHaveLength(1)
    })

    it('renders the results if there were matches for the query', async () => {
      const mockResults = mockCmsSearchResults.map((r) => ({
        ...r,
        permalink:
          r.type === 'Article'
            ? `http://localhost/articles/${r.permalink}`
            : r.permalink,
      }))
      renderWithAuth(<SearchPage query="fitness" results={mockResults} />)
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 3 results for ‘fitness’')
      expect(
        await screen.findByText(
          'You’ve reached the end of your search results.'
        )
      ).toBeInTheDocument()
    })

    it('renders the correct text if there is only one result', async () => {
      const mockResults = [mockCmsSearchResults[0]].map((r) => ({
        ...r,
        permalink:
          r.type === 'Article'
            ? `http://localhost/articles/${r.permalink}`
            : r.permalink,
      }))

      renderWithAuth(<SearchPage query="fitness" results={mockResults} />)
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There is 1 result for ‘fitness’')
      expect(
        await screen.findByText(
          'You’ve reached the end of your search results.'
        )
      ).toBeInTheDocument()
    })
  })
})
