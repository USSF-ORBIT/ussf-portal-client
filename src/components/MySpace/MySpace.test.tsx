/**
 * @jest-environment jsdom
 */
import { act, screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import { renderWithModalRoot } from '../../testHelpers'
import { getCollectionsMock } from '../../__fixtures__/operations/getCollection'
import { cmsCollectionsMock } from '../../__fixtures__/data/cmsCollections'
import MySpace from './MySpace'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { REMOVE_COLLECTION } from 'operations/mutations/removeCollection'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { EDIT_COLLECTION } from 'operations/mutations/editCollection'

const mockRouterPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}))

describe('My Space Component', () => {
  let scrollSpy: jest.Mock

  beforeAll(() => {
    scrollSpy = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollSpy
  })

  beforeEach(() => {
    scrollSpy.mockReset()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('default state', () => {
    let html: RenderResult
    beforeEach(() => {
      html = render(
        <MockedProvider mocks={getCollectionsMock} addTypename={false}>
          <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
        </MockedProvider>
      )
    })

    it('renders without error ', async () => {
      // Because MockedProvider is async/promise-based,
      // the test always completes when in the loading state
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('should render the collection', async () => {
      const collectionTitle = await screen.findByRole('heading', {
        level: 3,
      })

      expect(collectionTitle).toHaveTextContent(
        getCollectionsMock[0].result.data.collections[0].title
      )

      expect(await screen.findByRole('list')).toBeInTheDocument()
      expect(await screen.findAllByRole('listitem')).toHaveLength(3)
      expect(await screen.findAllByRole('link')).toHaveLength(3)
    })

    it('renders the add widget component', async () => {
      expect(
        await screen.findByRole('button', { name: 'Add section' })
      ).toBeInTheDocument()
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
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
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    expect(await screen.findByText('Error')).toBeInTheDocument()
  })

  it('navigates to Sites & Applications when adding new existing collections', async () => {
    render(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    userEvent.click(await screen.findByRole('button', { name: 'Add section' }))
    userEvent.click(
      await screen.findByRole('button', {
        name: 'Select collection from template',
      })
    )

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/sites-and-applications',
      query: { selectMode: 'true' },
    })
  })

  it('handles the remove bookmark operation', async () => {
    let bookmarkRemoved = false

    const mocksWithRemove = [
      ...getCollectionsMock,
      {
        request: {
          query: REMOVE_BOOKMARK,
          variables: {
            _id: getCollectionsMock[0].result.data.collections[0].bookmarks[0]
              ._id,
            collectionId: getCollectionsMock[0].result.data.collections[0]._id,
            cmsId: null,
          },
          refetchQueries: [`getCollections`],
        },
        result: () => {
          bookmarkRemoved = true
          return {
            data: {
              removeBookmark: {
                _id: getCollectionsMock[0].result.data.collections[0]._id,
              },
            },
          }
        },
      },
    ]

    jest.useFakeTimers()

    render(
      <MockedProvider mocks={mocksWithRemove} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const buttons = await screen.findAllByRole('button', {
      name: 'Remove this bookmark',
    })

    userEvent.click(buttons[0])

    await act(async () => {
      jest.runAllTimers()
    })

    expect(bookmarkRemoved).toBe(true)
  })

  it('handles the add bookmark operation', async () => {
    let bookmarkAdded = false
    const addBookmarkMock = [
      ...getCollectionsMock,
      {
        request: {
          query: ADD_BOOKMARK,
          variables: {
            collectionId: getCollectionsMock[0].result.data.collections[0]._id,
            url: 'http://www.example.com',
            label: 'My Custom Link',
          },
        },
        result: () => {
          bookmarkAdded = true
          return {
            data: {
              addBookmark: {
                _id: '100',
                cmsId: null,
                url: 'http://www.example.com',
                label: 'My Custom Link',
              },
            },
          }
        },
      },
    ]
    renderWithModalRoot(
      <MockedProvider mocks={addBookmarkMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const addLinkButton = await screen.findByRole('button', {
      name: '+ Add link',
    })

    userEvent.click(addLinkButton)
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(
      screen.getByRole('option', { name: 'http://www.example.com' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))
    userEvent.type(screen.getByLabelText('Label'), 'My Custom Link')

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response
    expect(bookmarkAdded).toBe(true)
  })

  it('handles the edit collection title operation', async () => {
    let collectionEdited = false
    const editCollectionMock = [
      ...getCollectionsMock,
      {
        request: {
          query: EDIT_COLLECTION,
          variables: {
            _id: getCollectionsMock[0].result.data.collections[0]._id,
            title: 'Updated Title',
          },
        },
        result: () => {
          collectionEdited = true
          return {
            data: {
              editCollection: {
                _id: getCollectionsMock[0].result.data.collections[0]._id,
                title: 'Updated Title',
                bookmarks:
                  getCollectionsMock[0].result.data.collections[0].bookmarks,
              },
            },
          }
        },
      },
    ]
    render(
      <MockedProvider mocks={editCollectionMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const settings = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    userEvent.click(settings)

    const edit = await screen.findByRole('button', {
      name: 'Edit collection title',
    })
    userEvent.click(edit)

    const input = await screen.findByRole('textbox')
    userEvent.clear(input)
    userEvent.type(input, 'Updated Title{enter}')

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response
    expect(collectionEdited).toBe(true)
  })

  it('handles the remove collection operation', async () => {
    let collectionRemoved = false

    const removeCollectionMock = [
      ...getCollectionsMock,
      {
        request: {
          query: REMOVE_COLLECTION,
          variables: {
            _id: getCollectionsMock[0].result.data.collections[0]._id,
          },
        },
        result: () => {
          collectionRemoved = true
          return {
            data: {
              removeCollection: {
                _id: getCollectionsMock[0].result.data.collections[0]._id,
              },
            },
          }
        },
      },
    ]
    renderWithModalRoot(
      <MockedProvider mocks={removeCollectionMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const dropdownMenu = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    userEvent.click(dropdownMenu)
    userEvent.click(
      screen.getByRole('button', { name: 'Delete this collection' })
    )
    userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response

    expect(collectionRemoved).toBe(true)
  })

  it('handles the add collection operation', async () => {
    let collectionAdded = false
    const addCollectionMock = [
      ...getCollectionsMock,
      {
        request: {
          query: ADD_COLLECTION,
          variables: {
            title: '',
            bookmarks: [],
          },
        },
        result: () => {
          collectionAdded = true
          return {
            data: {
              addCollection: {
                _id: '100',
                title: '',
                bookmarks: [],
              },
            },
          }
        },
      },
    ]
    render(
      <MockedProvider mocks={addCollectionMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    userEvent.click(await screen.findByRole('button', { name: 'Add section' }))
    userEvent.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response

    expect(collectionAdded).toBe(true)
  })
})
