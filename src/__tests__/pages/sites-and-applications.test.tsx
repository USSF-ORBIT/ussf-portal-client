/**
 * @jest-environment jsdom
 */
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ObjectId } from 'mongodb'
import { renderWithAuth } from '../../testHelpers'

import {
  getMySpaceMock,
  getMySpaceMaximumCollectionsMock,
} from '../../__fixtures__/operations/getMySpace'
import { cmsBookmarksMock } from '../../__fixtures__/data/cmsBookmarks'
import { cmsCollectionsMock } from '../../__fixtures__/data/cmsCollections'

import { GetMySpaceDocument } from 'operations/portal/queries/getMySpace.g'
import { AddCollectionDocument } from 'operations/portal/mutations/addCollection.g'
import { AddCollectionsDocument } from 'operations/portal/mutations/addCollections.g'
import { AddBookmarkDocument } from 'operations/portal/mutations/addBookmark.g'
import { addCollectionsInput } from 'operations/helpers'

import SitesAndApplications from 'pages/sites-and-applications'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return
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
let bookmarkAdded = false
let collectionsAdded = false

const sitesAndAppsMock = [
  ...getMySpaceMock,
  {
    request: {
      query: AddCollectionDocument,
      variables: {
        title: '',
        bookmarks: [
          {
            cmsId: cmsBookmarksMock[0].id,
            url: cmsBookmarksMock[0].url,
            label: cmsBookmarksMock[0].label,
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
                cmsId: cmsBookmarksMock[0].id,
                url: cmsBookmarksMock[0].url,
                label: cmsBookmarksMock[0].label,
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
        cmsCollectionsMock[0],
        cmsCollectionsMock[1],
      ]),
    },
    result: () => {
      collectionsAdded = true
      return {
        data: {
          addCollections: cmsCollectionsMock.map((c) => ({
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
  {
    request: {
      query: AddBookmarkDocument,
      variables: {
        collectionId: getMySpaceMock[0].result.data.mySpace[0]._id,
        cmsId: cmsBookmarksMock[0].id,
        url: cmsBookmarksMock[0].url,
        label: cmsBookmarksMock[0].label,
        id: cmsBookmarksMock[0].id,
      },
    },
    result: () => {
      bookmarkAdded = true
      return {
        data: {
          addBookmark: {
            _id: ObjectId(),
            url: cmsBookmarksMock[0].url,
            label: cmsBookmarksMock[0].label,
            cmsId: cmsBookmarksMock[0].id,
          },
        },
      }
    },
  },
]
describe('Sites and Applications page', () => {
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
        expect(screen.getByText('Content is loading...')).toBeInTheDocument()
      })

      it('renders Sites & Applications content', async () => {
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

      it('sorts by type by default', async () => {
        const collections = await screen.findAllByRole('heading', { level: 3 })
        expect(collections).toHaveLength(cmsCollectionsMock.length)
        collections.forEach((c, i) => {
          // eslint-disable-next-line security/detect-object-injection
          expect(collections[i]).toHaveTextContent(cmsCollectionsMock[i].title)
        })
      })

      it('can toggle sort type', async () => {
        const user = userEvent.setup({
          advanceTimers: jest.advanceTimersByTime,
        })

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
          cmsBookmarksMock.length
        )
        expect(sortTypeBtn).not.toBeDisabled()

        await user.click(sortTypeBtn)
        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(
          cmsCollectionsMock.length
        )
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
        expect(sortAlphaBtn).not.toBeDisabled()
      })

      describe('selecting collections', () => {
        beforeEach(async () => {
          await screen.findByRole('button', {
            name: 'Select multiple collections',
          })
        })

        it('can enter select mode', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })
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

        it('can cancel out of select mode', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

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

        it('can select multiple collections and add them', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

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

        it('cannot select more than the max number of collections', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          await user.click(
            screen.getByRole('button', {
              name: 'Select multiple collections',
            })
          )

          expect(
            screen.getByRole('button', { name: 'Add selected' })
          ).toBeDisabled()
          expect(screen.getByText('0 collections selected')).toBeInTheDocument()
          expect(
            screen.getByText('(3 of 25 possible remaining)')
          ).toBeInTheDocument()

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
            screen.queryByRole('button', {
              name: 'Select collection Example Collection 4',
            })
          ).toBeInTheDocument()

          await user.click(
            screen.getByRole('button', {
              name: 'Select collection Example Collection 3',
            })
          )
          expect(screen.getByText('3 collections selected')).toBeInTheDocument()
          expect(
            screen.getByText('(0 of 25 possible remaining)')
          ).toBeInTheDocument()

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

        it('selecting the same collection twice removes it from the selection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

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
        it('can add a bookmark to an existing collection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

          const sortAlpha = await screen.findByRole('button', {
            name: 'Sort alphabetically',
          })
          await user.click(sortAlpha)

          await user.click(
            screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
          )

          await act(async () => {
            await user.click(
              screen.getByRole('button', { name: 'Example Collection' })
            )
          })

          const flashMessage = screen.getAllByRole('alert')[0]

          expect(flashMessage).toHaveTextContent(
            `You have successfully added “${cmsBookmarksMock[0].label}” to the “Example Collection” section.`
          )

          await act(async () => {
            jest.runAllTimers()
          })

          expect(bookmarkAdded).toBe(true)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('cannot add a bookmark to an existing collection with 10 links', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

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

        it('can add a bookmark to a new collection', async () => {
          const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
          })

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

    it('enters select mode by default if a query param is specified', async () => {
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
          name: 'Select multiple collections',
        })
      ).not.toBeInTheDocument()

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Add selected' })
      ).toBeDisabled()
    })

    it('prevents adding more collections if the user already has 25', async () => {
      renderWithAuth(
        <MockedProvider mocks={getMySpaceMaximumCollectionsMock}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>
      )

      const selectBtn = await screen.findByRole('button', {
        name: 'Select multiple collections',
      })
      expect(selectBtn).toBeDisabled()
    })

    it('prevents adding a bookmark to a new collection if the user already has 25', async () => {
      const user = userEvent.setup()

      renderWithAuth(
        <MockedProvider mocks={getMySpaceMaximumCollectionsMock}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>
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

    it('shows an error state', async () => {
      const errorMock = [
        {
          request: {
            query: GetMySpaceDocument,
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
