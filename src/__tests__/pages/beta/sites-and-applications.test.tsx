/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import { getCollectionsMock } from '../../../fixtures/getCollection'
import { cmsBookmarksMock } from '../../../fixtures/cmsBookmarks'
import { cmsCollectionsMock } from '../../../fixtures/cmsCollections'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

import SitesAndApplications, {
  getStaticProps,
} from 'pages/beta/sites-and-applications'

const mockAddCollections = jest.fn()
const mockAddCollection = jest.fn()
const mockAddBookmark = jest.fn()
const mockPush = jest.fn()

jest.mock('operations/mutations/addCollections', () => ({
  useAddCollectionsMutation: () => [mockAddCollections],
}))

jest.mock('operations/mutations/addCollection', () => ({
  useAddCollectionMutation: () => [mockAddCollection],
}))

jest.mock('operations/mutations/addBookmark', () => ({
  useAddBookmarkMutation: () => [mockAddBookmark],
}))

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

// const mockBookmarks = [
//   {
//     id: '1',
//     url: 'www.example.com',
//     label: 'Example 1',
//   },
//   {
//     id: '2',
//     url: 'www.example2.com',
//     label: 'Example 2',
//   },
// ]

// const cmsCollectionsMock = [
//   {
//     id: '1',
//     title: 'Example Collection 1',
//     bookmarks: [
//       {
//         id: '1',
//         url: 'www.example.com',
//         label: 'Example 1',
//       },
//     ],
//   },
//   {
//     id: '2',
//     title: 'Example Collection 2',
//     bookmarks: [
//       {
//         id: '1',
//         url: 'www.example.com',
//         label: 'Example 1',
//       },
//       {
//         id: '2',
//         url: 'www.example2.com',
//         label: 'Example 2',
//       },
//     ],
//   },
// ]

describe('Sites and Applications page', () => {
  describe('default state', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      render(
        <MockedProvider mocks={getCollectionsMock}>
          <SitesAndApplications
            collections={cmsCollectionsMock}
            bookmarks={cmsBookmarksMock}
          />
        </MockedProvider>
      )
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
      expect(screen.getAllByRole('link')).toHaveLength(cmsBookmarksMock.length)
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

        expect(screen.queryByText('0 collections selected')).toBeInTheDocument()

        userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

        expect(
          screen.queryByText('0 collections selected')
        ).not.toBeInTheDocument()
      })

      it('can select multiple collections and add them', () => {
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

        expect(mockAddCollections).toHaveBeenCalledWith({
          variables: {
            collections: cmsCollectionsMock,
          },
          refetchQueries: [`getCollections`],
        })
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

      it('can add a bookmark to an existing collection', () => {
        userEvent.click(
          screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
        )
        userEvent.click(
          screen.getByRole('button', { name: 'Example Collection' })
        )

        expect(mockAddBookmark).toHaveBeenCalledWith({
          variables: {
            collectionId: getCollectionsMock[0].result.data.collections[0]._id,
            ...cmsBookmarksMock[0],
          },
          refetchQueries: [`getCollections`],
        })

        const flashMessage = screen.getByRole('alert')

        expect(flashMessage).toHaveTextContent(
          `You have successfully added “${cmsBookmarksMock[0].label}” to the “${getCollectionsMock[0].result.data.collections[0].title}” section.`
        )

        act(() => {
          jest.runAllTimers()
        })

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('can add a bookmark to a new collection', () => {
        userEvent.click(
          screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
        )
        userEvent.click(
          screen.getByRole('button', { name: 'Add to new collection' })
        )

        expect(mockAddCollection).toHaveBeenCalledWith({
          variables: {
            title: '',
            bookmarks: [
              {
                url: cmsBookmarksMock[0].url,
                label: cmsBookmarksMock[0].label,
              },
            ],
          },
          refetchQueries: [`getCollections`],
        })

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

    render(
      <MockedProvider mocks={getCollectionsMock}>
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
    expect(screen.getByRole('button', { name: 'Add selected' })).toBeDisabled()
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

    render(
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

describe('getStaticProps', () => {
  it('returns expected props', async () => {
    const results = await getStaticProps()
    expect(results).toEqual({ props: { collections: [], bookmarks: [] } })
  })
})
