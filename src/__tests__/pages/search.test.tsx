/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import { mockFlags } from 'jest-launchdarkly-mock'
import type { GetServerSidePropsContext } from 'next'

import { renderWithAuth } from '../../testHelpers'

import { mockCmsSearchResults } from '__fixtures__/data/cmsSearch'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'

import SearchPage, { getServerSideProps } from 'pages/search'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

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

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

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

describe('Search page getServerSideProps', () => {
  test('returns no query and no results if there was no query', async () => {
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

  test('returns the query and results if there was a query', async () => {
    const testContext = {
      query: { q: 'fitness' },
    } as unknown as GetServerSidePropsContext

    const response = await getServerSideProps(testContext)

    expect(response).toEqual({
      props: {
        query: 'fitness',
        pageTitle: 'fitness Search Results',
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
    test('renders the loader while fetching the user', () => {
      jest
        .spyOn(useUserHooks, 'useUser')
        .mockImplementation((): MockedImplementation => {
          return {
            user: null,
            portalUser: undefined,
            loading: true,
          }
        })
      renderWithAuth(<SearchPage />, {})
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('renders an empty state if there is no query', async () => {
      renderWithAuth(
        <SearchPage
          query={''}
          results={[]}
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )

      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 0 results for ‘’')

      expect(
        screen.getAllByText('There are no results that match that query.')
      ).toHaveLength(1)
    })

    test('renders no results if there were no matches for the query', async () => {
      renderWithAuth(
        <SearchPage
          query="nomatches"
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 0 results for ‘nomatches’')

      expect(
        screen.getAllByText('There are no results that match that query.')
      ).toHaveLength(1)
    })

    test('renders the SearchFilter component', () => {
      mockFlags({
        searchPageFilter: true,
      })

      renderWithAuth(
        <SearchPage
          query="fitness"
          results={[]}
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )

      expect(screen.getByText('Filter Search')).toBeInTheDocument()
    })

    test('does not render the SearchFilter component if the flag is off', () => {
      mockFlags({
        searchPageFilter: false,
      })

      renderWithAuth(
        <SearchPage
          query="fitness"
          results={[]}
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )

      expect(screen.queryByText('Filter Search')).not.toBeInTheDocument()
    })

    test('renders the results if there were matches for the query', async () => {
      const mockResults = mockCmsSearchResults.map((r) => ({
        ...r,
        permalink:
          r.type === 'Article'
            ? `http://localhost/articles/${r.permalink}`
            : r.permalink,
      }))
      renderWithAuth(
        <SearchPage
          query="fitness"
          results={mockResults}
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('There are 3 results for ‘fitness’')
      expect(
        await screen.findByText(
          'You’ve reached the end of your search results.'
        )
      ).toBeInTheDocument()
    })

    test('renders the correct text if there is only one result', async () => {
      const mockResults = [mockCmsSearchResults[0]].map((r) => ({
        ...r,
        permalink:
          r.type === 'Article'
            ? `http://localhost/articles/${r.permalink}`
            : r.permalink,
      }))

      renderWithAuth(
        <SearchPage
          query="fitness"
          results={mockResults}
          labels={[{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]}
        />
      )
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
