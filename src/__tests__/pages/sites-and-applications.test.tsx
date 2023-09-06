/**
 * @jest-environment jsdom
 */
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import { ObjectId } from 'mongodb'
import { renderWithAuth, renderWithAuthAndApollo } from '../../testHelpers'

import { cmsBookmarksMock as mockCMSBookmarks } from '../../__fixtures__/data/cmsBookmarks'
import { cmsCollectionsMock as mockCMSCollections } from '../../__fixtures__/data/cmsCollections'
import {
  portalUserWithExampleCollection,
  portalUserMaxedOutCollection,
  portalUserCollectionLimit,
  portalUserAlmostAtCollectionLimit,
  testUser1,
} from '__fixtures__/authUsers'
import * as useUserHooks from 'hooks/useUser'

import { AddCollectionDocument } from 'operations/portal/mutations/addCollection.g'
import { AddCollectionsDocument } from 'operations/portal/mutations/addCollections.g'
import { addCollectionsInput } from 'operations/helpers'
import { AddBookmarkDocument } from 'operations/portal/mutations/addBookmark.g'
import SitesAndApplications, {
  getServerSideProps,
} from 'pages/sites-and-applications'

beforeEach(() => {
  jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
    return {
      user: testUser1,
      portalUser: portalUserWithExampleCollection,
      loading: false,
    }
  })
})

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
    test('renders the loader while fetching the user', () => {
      jest.useFakeTimers()

      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: null,
          portalUser: null,
          loading: true,
        }
      })

      renderWithAuth(
        <MockedProvider mocks={sitesAndAppsMock}>
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
            pageTitle={'Sites & Applications'}
          />
        </MockedProvider>
      )
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
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
            pageTitle={'Sites & Applications'}
          />,
          {},
          sitesAndAppsMock
        )

        expect(
          await screen.findByRole('heading', {
            name: 'Sites & Applications By type',
          })
        ).toBeInTheDocument()

        expect(screen.getByTestId('navDropDownButton')).toBeInTheDocument()
      })

      test('sorts by type by default', async () => {
        renderWithAuthAndApollo(
          <SitesAndApplications
            collections={mockCMSCollections}
            bookmarks={mockCMSBookmarks}
            pageTitle={'Sites & Applications'}
          />,
          {},
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
            pageTitle={'Sites & Applications'}
          />,
          {},
          sitesAndAppsMock
        )

        const toggleDropdown = screen.getByTestId('navDropDownButton')
        await user.click(toggleDropdown)

        const sortAlpha = await screen.findByRole('button', {
          name: 'Alphabetically',
        })
        await user.click(sortAlpha)

        expect(
          await screen.findByRole('heading', {
            name: 'Sites & Applications Alphabetically',
          })
        ).toBeInTheDocument()
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('link')).toHaveLength(
          mockCMSBookmarks.length
        )

        await user.click(screen.getByTestId('navDropDownButton'))
        const sortType = await screen.findByRole('button', {
          name: 'By Type',
        })
        await user.click(sortType)

        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(
          mockCMSCollections.length
        )
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
        expect(sortAlpha).not.toBeDisabled()
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
              pageTitle={'Sites & Applications'}
            />,
            {},
            sitesAndAppsMock
          )

          const selectBtn = screen.getByRole('button', {
            name: 'Select multiple collections',
          })
          expect(selectBtn).toBeInTheDocument()
          await user.click(selectBtn)

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
              pageTitle={'Sites & Applications'}
            />,
            {},
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

          jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
            return {
              user: testUser1,
              portalUser: portalUserAlmostAtCollectionLimit,
              loading: false,
            }
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
              pageTitle={'Sites & Applications'}
            />,
            {},
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

          expect(
            screen.getByText('(2 of 25 possible remaining)')
          ).toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 2',
            })
          )
          expect(screen.getByText('2 collections selected')).toBeInTheDocument()

          expect(
            screen.getByText('(1 of 25 possible remaining)')
          ).toBeInTheDocument()

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

          jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
            return {
              user: testUser1,
              portalUser: portalUserCollectionLimit,
              loading: false,
            }
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
              pageTitle={'Sites & Applications'}
            />,
            {},
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
              pageTitle={'Sites & Applications'}
            />,
            {},
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
        test('can add a bookmark to an existing collection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          let bookmarkAdded = false

          const addBookmarkMock = [
            {
              request: {
                query: AddBookmarkDocument,
                variables: {
                  url: mockCMSBookmarks[0].url,
                  label: mockCMSBookmarks[0].label,
                  collectionId: portalUserWithExampleCollection.mySpace[0]._id,
                  cmsId: mockCMSBookmarks[0].id,
                },
              },
              result: () => {
                bookmarkAdded = true
                return {
                  data: {
                    addBookmark: {
                      _id: ObjectId(),
                      url: mockCMSBookmarks[0].url,
                      label: mockCMSBookmarks[0].label,
                      cmsId: mockCMSBookmarks[0].id,
                    },
                  },
                }
              },
            },
          ]

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
              pageTitle={'Sites & Applications'}
            />,
            {},
            addBookmarkMock
          )

          const toggleDropdown = screen.getByTestId('navDropDownButton')
          await user.click(toggleDropdown)

          const sortAlpha = await screen.findByRole('button', {
            name: 'Alphabetically',
          })

          await user.click(sortAlpha)

          await user.click(
            screen.getByRole('button', {
              name: 'Add MyVector to My Space Closed',
            })
          )

          await user.click(
            screen.getByRole('button', { name: 'Example Collection' })
          )

          const flashMessage = screen.getAllByRole('alert')[0]

          expect(flashMessage).toHaveTextContent(
            `You have successfully added “MyVector” to the “Example Collection” collection.`
          )

          await act(async () => {
            jest.runAllTimers()
          })

          expect(bookmarkAdded).toBe(true)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        test('cannot add a bookmark to an existing collection with 10 links', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
            return {
              user: testUser1,
              portalUser: portalUserMaxedOutCollection,
              loading: false,
            }
          })

          renderWithAuthAndApollo(
            <SitesAndApplications
              collections={mockCMSCollections}
              bookmarks={mockCMSBookmarks}
              pageTitle={'Sites & Applications'}
            />,
            {},
            sitesAndAppsMock
          )

          const toggleDropdown = screen.getByTestId('navDropDownButton')
          await user.click(toggleDropdown)

          const sortAlpha = await screen.findByRole('button', {
            name: 'Alphabetically',
          })

          await user.click(sortAlpha)

          expect(screen.getByRole('alert')).toHaveTextContent(
            `At least one collection on your My Space has reached the maximum number of links allowed (10).`
          )

          await user.click(
            screen.getByRole('button', { name: 'Add ACMS to My Space Closed' })
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
              pageTitle={'Sites & Applications'}
            />,
            {},
            sitesAndAppsMock
          )
          const toggleDropdown = screen.getByTestId('navDropDownButton')
          await user.click(toggleDropdown)

          const sortAlpha = await screen.findByRole('button', {
            name: 'Alphabetically',
          })

          await user.click(sortAlpha)

          await user.click(
            screen.getByRole('button', {
              name: 'Add MyVector to My Space Closed',
            })
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
            pageTitle={'Sites & Applications'}
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
      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: testUser1,
          portalUser: portalUserCollectionLimit,
          loading: false,
        }
      })

      renderWithAuthAndApollo(
        <SitesAndApplications
          collections={mockCMSCollections}
          bookmarks={mockCMSBookmarks}
          pageTitle={'Sites & Applications'}
        />
      )

      const selectBtn = await screen.findByRole('button', {
        name: 'Select multiple collections',
      })
      expect(selectBtn).toBeDisabled()
    })

    test('prevents adding a bookmark to a new collection if the user already has 25', async () => {
      const user = userEvent.setup()

      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: testUser1,
          portalUser: portalUserCollectionLimit,
          loading: false,
        }
      })

      renderWithAuthAndApollo(
        <SitesAndApplications
          collections={mockCMSCollections}
          bookmarks={mockCMSBookmarks}
          pageTitle={'Sites & Applications'}
        />
      )

      const toggleDropdown = screen.getByTestId('navDropDownButton')
      await user.click(toggleDropdown)

      const sortAlpha = await screen.findByRole('button', {
        name: 'Alphabetically',
      })

      await user.click(sortAlpha)

      expect(screen.getByRole('alert')).toHaveTextContent(
        `You have reached the maximum number of collections allowed on your My Space (25).`
      )

      await user.click(
        screen.getByRole('button', { name: 'Add ACMS to My Space Closed' })
      )

      expect(
        screen.getByRole('button', { name: 'Add to new collection' })
      ).toBeDisabled()
    })
  })
})

describe('getServerSideProps', () => {
  test('returns the correct props from getServerSideProps', async () => {
    const response = await getServerSideProps()

    expect(response).toEqual({
      props: {
        collections: mockCMSCollections,
        bookmarks: mockCMSBookmarks,
        pageTitle: 'Sites & Applications',
      },
    })
  })
})
