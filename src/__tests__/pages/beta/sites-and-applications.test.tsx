/**
 * @jest-environment jsdom
 */
import { screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import { getCollectionsMock } from '../../../fixtures/getCollection'
import {
  sitesAndAppsMock,
  collectionAdded,
  collectionsAdded,
  bookmarkAdded,
} from '../../../fixtures/sitesAndApps'
import { cmsBookmarksMock } from '../../../fixtures/cmsBookmarks'
import { cmsCollectionsMock } from '../../../fixtures/cmsCollections'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

import SitesAndApplications, {
  getStaticProps,
} from 'pages/beta/sites-and-applications'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
  }),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: mockPush,
})

describe('Sites and Applications page', () => {
  describe('without a user', () => {
    const { location } = window

    beforeAll((): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete window.location
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.location = {
        href: '',
      }
    })

    afterAll((): void => {
      window.location = location
    })

    beforeEach(() => {
      jest.useFakeTimers()

      renderWithAuth(
        <MockedProvider mocks={sitesAndAppsMock}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>,
        { user: null }
      )
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(window.location.href).toEqual('/login')
      })
    })
  })

  describe('when logged in', () => {
    describe('default state', () => {
      beforeEach(() => {
        jest.useFakeTimers()
        renderWithAuth(
          <MockedProvider mocks={sitesAndAppsMock}>
            <SitesAndApplications
              collections={cmsCollectionsMock}
              bookmarks={cmsBookmarksMock}
            />
          </MockedProvider>
        )
      })

      afterEach(() => {
        jest.useRealTimers()
      })

      it('renders the loading state', () => {
        expect(screen.getByText('Loading...')).toBeInTheDocument()
      })

      it('renders Sites & Applications content', async () => {
        expect(
          await screen.findByRole('heading', { name: 'Sites & Applications' })
        ).toBeInTheDocument()
      })

      it('sorts by type by default', async () => {
        const collections = await screen.findAllByRole('heading', { level: 3 })
        expect(collections).toHaveLength(cmsCollectionsMock.length)
        collections.forEach((c, i) => {
          // eslint-disable-next-line security/detect-object-injection
          expect(collections[i]).toHaveTextContent(cmsCollectionsMock[i].title)
        })
      })

      it('can toggle sort type', async () => {
        const sortAlphaBtn = await screen.findByRole('button', {
          name: 'Sort alphabetically',
        })

        const sortTypeBtn = screen.getByRole('button', { name: 'Sort by type' })

        expect(sortTypeBtn).toBeDisabled()
        userEvent.click(sortAlphaBtn)

        expect(sortAlphaBtn).toBeDisabled()
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('link')).toHaveLength(
          cmsBookmarksMock.length
        )
        expect(sortTypeBtn).not.toBeDisabled()

        userEvent.click(sortTypeBtn)
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(
          cmsCollectionsMock.length
        )
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
        expect(sortAlphaBtn).not.toBeDisabled()
      })

      describe('selecting collections', () => {
        beforeEach(async () => {
          await screen.findByRole('button', {
            name: 'Select collections',
          })
        })

        it('can enter select mode', () => {
          const selectBtn = screen.getByRole('button', {
            name: 'Select collections',
          })
          expect(selectBtn).toBeInTheDocument()
          userEvent.click(selectBtn)

          expect(
            screen.getByRole('button', {
              name: 'Sort alphabetically',
            })
          ).toBeDisabled()

          expect(
            screen.queryByRole('button', { name: 'Select collections' })
          ).not.toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: 'Cancel' })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()

          expect(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 1',
            })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          ).toBeInTheDocument()
        })

        it('can cancel out of select mode', () => {
          expect(
            screen.queryByText('0 collections selected')
          ).not.toBeInTheDocument()

          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collections',
            })
          )

          expect(
            screen.queryByText('0 collections selected')
          ).toBeInTheDocument()

          userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

          expect(
            screen.queryByText('0 collections selected')
          ).not.toBeInTheDocument()
        })

        it('can select multiple collections and add them', async () => {
          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collections',
            })
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()

          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()
          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          )
          expect(screen.getByText('2 collections selected')).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeEnabled()

          userEvent.click(screen.getByRole('button', { name: 'Add selected' }))

          await act(async () => {
            jest.runAllTimers()
          })
          expect(collectionsAdded).toBe(true)
        })

        it('selecting the same collection twice removes it from the selection', () => {
          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collections',
            })
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()

          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()
          userEvent.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          )
          expect(screen.getByText('2 collections selected')).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeEnabled()

          userEvent.click(
            screen.getByRole('button', {
              name: 'Unselect collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()
          userEvent.click(
            screen.getByRole('button', {
              name: 'Unselect collection Example Collection 2',
            })
          )
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()
        })
      })

      describe('selecting bookmarks', () => {
        beforeEach(async () => {
          userEvent.click(
            await screen.findByRole('button', {
              name: 'Sort alphabetically',
            })
          )
        })

        it('can add a bookmark to an existing collection', async () => {
          userEvent.click(
            screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
          )
          userEvent.click(
            screen.getByRole('button', { name: 'Example Collection' })
          )

          const flashMessage = screen.getByRole('alert')

          expect(flashMessage).toHaveTextContent(
            `You have successfully added “${cmsBookmarksMock[0].label}” to the “${getCollectionsMock[0].result.data.collections[0].title}” section.`
          )

          await act(async () => {
            jest.runAllTimers()
          })

          expect(bookmarkAdded).toBe(true)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('can add a bookmark to a new collection', async () => {
          userEvent.click(
            screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
          )

          userEvent.click(
            screen.getByRole('button', { name: 'Add to new collection' })
          )

          await act(async () => {
            jest.runAllTimers()
          })
          expect(collectionAdded).toBe(true)
          expect(mockPush).toHaveBeenCalledWith('/')
        })
      })
    })

    it('enters select mode by default if a query param is specified', async () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/',
        query: { selectMode: 'true' },
        asPath: '/',
      })

      renderWithAuth(
        <MockedProvider mocks={sitesAndAppsMock}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>
      )

      expect(
        await screen.findByText('0 collections selected')
      ).toBeInTheDocument()

      expect(
        screen.queryByRole('button', {
          name: 'Select collections',
        })
      ).not.toBeInTheDocument()

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
    })

    it('shows an error state', async () => {
      const errorMock = [
        {
          request: {
            query: GET_COLLECTIONS,
          },
          error: new Error(),
        },
      ]

      renderWithAuth(
        <MockedProvider mocks={errorMock} addTypename={false}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>
      )

      expect(await screen.findByText('Error')).toBeInTheDocument()
    })
  })
})

describe('getStaticProps', () => {
  it('returns expected props', async () => {
    const results = await getStaticProps()
    expect(results).toEqual({ props: { collections: [], bookmarks: [] } })
  })
})
