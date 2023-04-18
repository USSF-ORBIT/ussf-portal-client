/**
 * @jest-environment jsdom
 */
import { screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ObjectId } from 'mongodb'
import { renderWithAuth, renderWithAuthAndApollo } from '../../testHelpers'

import { cmsBookmarksMock as mockCMSBookmarks } from '../../__fixtures__/data/cmsBookmarks'
import { cmsCollectionsMock as mockCMSCollections } from '../../__fixtures__/data/cmsCollections'
import {
  portalUserWithExampleCollection,
  portalUserMaxedOutCollection,
  portalUserCollectionLimit,
  portalUserAlmostAtCollectionLimit,
} from '__fixtures__/authUsers'

import { AddCollectionDocument } from 'operations/portal/mutations/addCollection.g'
import { AddCollectionsDocument } from 'operations/portal/mutations/addCollections.g'
import { addCollectionsInput } from 'operations/helpers'

import SitesAndApplications, {
  getServerSideProps,
} from 'pages/sites-and-applications'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          collections: mockCMSCollections,
          bookmarks: mockCMSBookmarks,
        },
      }
    },
  },
}))
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

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

let collectionAdded = false
let collectionsAdded = false

const sitesAndAppsMock = [
  {
    request: {
      query: AddCollectionDocument,
      variables: {
        title: '',
        bookmarks: [
          {
            cmsId: mockCMSBookmarks[0].id,
            url: mockCMSBookmarks[0].url,
            label: mockCMSBookmarks[0].label,
          },
        ],
      },
    },
    result: () => {
      collectionAdded = true

      return {
        data: {
          addCollection: {
            _id: ObjectId(),
            title: '',

            bookmarks: [
              {
                _id: ObjectId(),
                cmsId: mockCMSBookmarks[0].id,
                url: mockCMSBookmarks[0].url,
                label: mockCMSBookmarks[0].label,
              },
            ],
          },
        },
      }
    },
  },
  {
    request: {
      query: AddCollectionsDocument,
      variables: addCollectionsInput([
        mockCMSCollections[0],
        mockCMSCollections[1],
      ]),
    },
    result: () => {
      collectionsAdded = true
      return {
        data: {
          addCollections: mockCMSCollections.map((c) => ({
            _id: ObjectId(),
            title: c.title,
            cmsId: c.id,
            type: 'Collection',
            bookmarks: c.bookmarks.map((b) => ({
              _id: ObjectId(),
              cmsId: b.id,
              url: b.url,
              label: b.label,
            })),
          })),
        },
      }
    },
  },
]
describe('Sites and Applications page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest.useFakeTimers()

      renderWithAuth(
        <MockedProvider mocks={sitesAndAppsMock}>
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
          />
        </MockedProvider>,
        { user: null }
      )
    })

    test('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    test('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    describe('default state', () => {
      beforeEach(() => {
        jest.useFakeTimers()
      })

      afterEach(() => {
        jest.useRealTimers()
      })

      test('renders Sites & Applications content', async () => {
        renderWithAuthAndApollo(
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
          />,
          { portalUser: portalUserWithExampleCollection },
          sitesAndAppsMock
        )

        expect(
          await screen.findByRole('heading', { name: 'Sites & Applications' })
        ).toBeInTheDocument()
        expect(
          await screen.findByRole('button', {
            name: 'Sort by type',
          })
        ).toBeInTheDocument()
        expect(
          await screen.findByRole('button', {
            name: 'Sort alphabetically',
          })
        ).toBeInTheDocument()
      })

      test('sorts by type by default', async () => {
        renderWithAuthAndApollo(
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
          />,
          { portalUser: portalUserWithExampleCollection },
          sitesAndAppsMock
        )

        const collections = await screen.findAllByRole('heading', { level: 3 })
        expect(collections).toHaveLength(mockCMSCollections.length)
        collections.forEach((c, i) => {
          // eslint-disable-next-line security/detect-object-injection
          expect(collections[i]).toHaveTextContent(mockCMSCollections[i].title)
        })
      })

      test('can toggle sort type', async () => {
        const user = userEvent.setup({
          advanceTimers: jest.advanceTimersByTime,
        })

        renderWithAuthAndApollo(
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
          />,
          { portalUser: portalUserWithExampleCollection },
          sitesAndAppsMock
        )

        const sortAlphaBtn = await screen.findByRole('button', {
          name: 'Sort alphabetically',
        })

        const sortTypeBtn = screen.getByRole('button', { name: 'Sort by type' })

        expect(sortTypeBtn).toBeDisabled()
        await user.click(sortAlphaBtn)

        expect(sortAlphaBtn).toBeDisabled()
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('link')).toHaveLength(
          mockCMSBookmarks.length
        )
        expect(sortTypeBtn).not.toBeDisabled()

        await user.click(sortTypeBtn)
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(
          mockCMSCollections.length
        )
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
        expect(sortAlphaBtn).not.toBeDisabled()
      })

      describe('selecting collections', () => {
        test('can enter select mode', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserWithExampleCollection },
            sitesAndAppsMock
          )

          const selectBtn = screen.getByRole('button', {
            name: 'Select multiple collections',
          })
          expect(selectBtn).toBeInTheDocument()
          await user.click(selectBtn)

          expect(
            screen.getByRole('button', {
              name: 'Sort alphabetically',
            })
          ).toBeDisabled()

          expect(
            screen.queryByRole('button', {
              name: 'Select multiple collections',
            })
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

        test('can cancel out of select mode', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserWithExampleCollection },
            sitesAndAppsMock
          )

          expect(
            screen.queryByText('0 collections selected')
          ).not.toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select multiple collections',
            })
          )

          expect(
            screen.queryByText('0 collections selected')
          ).toBeInTheDocument()

          await user.click(screen.getByRole('button', { name: 'Cancel' }))

          expect(
            screen.queryByText('0 collections selected')
          ).not.toBeInTheDocument()
        })

        test('can select multiple collections and add them', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserAlmostAtCollectionLimit },
            sitesAndAppsMock
          )

          await user.click(
            screen.getByRole('button', {
              name: 'Select multiple collections',
            })
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          )
          expect(screen.getByText('2 collections selected')).toBeInTheDocument()

          expect(
            screen.getByRole('tooltip', {
              hidden: true,
            })
          ).toHaveTextContent(
            `You’re approaching the maximum number of collections (25) you can add to your My Space page.`
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeEnabled()

          await act(async () => {
            await user.click(
              screen.getByRole('button', { name: 'Add selected' })
            )
          })

          expect(collectionsAdded).toBe(true)
        })

        test('cannot select more than the max number of collections', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserCollectionLimit },
            sitesAndAppsMock
          )

          await user.click(
            screen.getByRole('button', {
              name: 'Select multiple collections',
            })
          )

          expect(
            screen.getByRole('tooltip', {
              hidden: true,
            })
          ).toHaveTextContent(
            `You can only add up to 25 collections to your My Space page. To add a new collection, please remove an existing one.`
          )

          expect(
            screen.queryByRole('button', {
              name: 'Select collection Example Collection 4',
            })
          ).not.toBeInTheDocument()
        })

        test('selecting the same collection twice removes test from the selection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserWithExampleCollection },
            sitesAndAppsMock
          )

          await user.click(
            screen.getByRole('button', {
              name: 'Select multiple collections',
            })
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()
          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          )
          expect(screen.getByText('2 collections selected')).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeEnabled()

          await user.click(
            screen.getByRole('button', {
              name: 'Unselect collection Example Collection 1',
            })
          )
          expect(screen.getByText('1 collection selected')).toBeInTheDocument()
          await user.click(
            screen.getByRole('button', {
              name: 'Unselect collection Example Collection 2',
            })
          )
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()
        })
      })

      describe('selecting bookmarks', () => {
        // test('can add a bookmark to an existing collection', async () => {
        //   const user = userEvent.setup({
        //     advanceTimers: jest.advanceTimersByTime,
        //   })

        //   // let bookmarkAdded = false
        //   // const addBookmarkMock = [
        //   //   {
        //   //     request: {
        //   //       query: AddBookmarkDocument,
        //   //       variables: {
        //   //         collectionId: portalUserWithExampleCollection.mySpace[0]._id,
        //   //         url: 'www.example.com/15',
        //   //         label: 'LeaveWeb',
        //   //         cmsId: '15',
        //   //       },
        //   //     },
        //   //     result: () => {
        //   //       bookmarkAdded = true
        //   //       return {
        //   //         data: {
        //   //           addBookmark: {
        //   //             _id: ObjectId(),
        //   //             cmsId: '15',
        //   //             url: 'www.example.com/15',
        //   //             label: 'LeaveWeb',
        //   //           },
        //   //         },
        //   //       }
        //   //     },
        //   //   },
        //   // ]

        //   renderWithAuthAndApollo(
        //     <SitesAndApplications
        //       collections={mockCMSCollections}
        //       bookmarks={mockCMSBookmarks}
        //     />,
        //     { portalUser: portalUserWithExampleCollection },
        //     sitesAndAppsMock
        //   )

        //   const sortAlpha = await screen.findByRole('button', {
        //     name: 'Sort alphabetically',
        //   })
        //   await user.click(sortAlpha)

        //   await user.click(
        //     screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
        //   )

        //   await user.click(
        //     screen.getByRole('button', { name: 'Example Collection' })
        //   )

        //   const flashMessage = screen.getAllByRole('alert')[0]

        //   expect(flashMessage).toHaveTextContent(
        //     `You have successfully added “${mockCMSBookmarks[0].label}” to the “Example Collection” section.`
        //   )

        //   await act(async () => {
        //     jest.runAllTimers()
        //   })

        //   expect(bookmarkAdded).toBe(true)
        //   expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        // })

        test('cannot add a bookmark to an existing collection with 10 links', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserMaxedOutCollection },
            sitesAndAppsMock
          )

          const sortAlpha = await screen.findByRole('button', {
            name: 'Sort alphabetically',
          })
          await user.click(sortAlpha)

          expect(screen.getByRole('alert')).toHaveTextContent(
            `At least one collection on your My Space has reached the maximum number of links allowed (10).`
          )

          await user.click(
            screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
          )

          expect(
            screen.getByRole('button', { name: 'Maxed Out Collection' })
          ).toBeDisabled()
        })

        test('can add a bookmark to a new collection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
            />,
            { portalUser: portalUserWithExampleCollection },
            sitesAndAppsMock
          )

          const sortAlpha = await screen.findByRole('button', {
            name: 'Sort alphabetically',
          })
          await user.click(sortAlpha)

          await user.click(
            screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
          )

          await act(async () => {
            await user.click(
              screen.getByRole('button', { name: 'Add to new collection' })
            )
          })

          expect(collectionAdded).toBe(true)
          expect(mockPush).toHaveBeenCalledWith('/')
        })
      })
    })

    test('enters select mode by default if a query param is specified', async () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/',
        query: { selectMode: 'true' },
        asPath: '/',
        push: mockPush,
        replace: mockReplace,
      })

      renderWithAuth(
        <MockedProvider mocks={sitesAndAppsMock}>
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
          />
        </MockedProvider>
      )

      expect(
        await screen.findByText('0 collections selected')
      ).toBeInTheDocument()

      expect(
        screen.queryByRole('button', {
          name: 'Select multiple collections',
        })
      ).not.toBeInTheDocument()

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
    })

    test('prevents adding more collections if the user already has 25', async () => {
      renderWithAuthAndApollo(
        <SitesAndApplications
          collections={mockCMSCollections}
          bookmarks={mockCMSBookmarks}
        />,
        { portalUser: portalUserCollectionLimit }
      )

      const selectBtn = await screen.findByRole('button', {
        name: 'Select multiple collections',
      })
      expect(selectBtn).toBeDisabled()
    })

    test('prevents adding a bookmark to a new collection if the user already has 25', async () => {
      const user = userEvent.setup()

      renderWithAuthAndApollo(
        <SitesAndApplications
          collections={mockCMSCollections}
          bookmarks={mockCMSBookmarks}
        />,
        { portalUser: portalUserCollectionLimit }
      )

      await user.click(
        await screen.findByRole('button', {
          name: 'Sort alphabetically',
        })
      )

      expect(screen.getByRole('alert')).toHaveTextContent(
        `You have reached the maximum number of collections allowed on your My Space (25).`
      )

      await user.click(
        screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
      )

      expect(
        screen.getByRole('button', { name: 'Add to new collection' })
      ).toBeDisabled()
    })
  })
})

describe('getServerSideProps', () => {
  it('returns the correct props from getServerSideProps', async () => {
    const response = await getServerSideProps()

    expect(response).toEqual({
      props: {
        collections: mockCMSCollections,
        bookmarks: mockCMSBookmarks,
      },
    })
  })
})
