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
import { getCollectionsMock } from '../../fixtures/getCollection'
import { cmsCollectionsMock } from '../../fixtures/cmsCollections'
import MySpace from './MySpace'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

const mockRouterPush = jest.fn()
const mockAddBookmark = jest.fn()
const mockRemoveBookmark = jest.fn()
const mockEditCollection = jest.fn()
const mockRemoveCollection = jest.fn()
const mockAddCollection = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}))

jest.mock('operations/mutations/addBookmark', () => ({
  useAddBookmarkMutation: () => [mockAddBookmark],
}))

jest.mock('operations/mutations/removeBookmark', () => ({
  useRemoveBookmarkMutation: () => [mockRemoveBookmark],
}))

jest.mock('operations/mutations/editCollection', () => ({
  useEditCollectionMutation: () => [mockEditCollection],
}))

jest.mock('operations/mutations/removeCollection', () => ({
  useRemoveCollectionMutation: () => [mockRemoveCollection],
}))

jest.mock('operations/mutations/addCollection', () => ({
  useAddCollectionMutation: () => [mockAddCollection],
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
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render the collection', async () => {
      const collection = await screen.findByRole('button', {
        name: 'Edit collection title',
      })

      expect(collection).toHaveTextContent(
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
    /*
    // TODO - this is not working as expected, I believe because we're using
    // @client with a mutation. Try again once the operation doesn't use @client
    let bookmarkRemoved = false
    const mocksWithRemove = [
      ...mocks,
      {
        request: {
          query: REMOVE_BOOKMARK,
          variables: {
            id: mocks[0].result.data.collections[0].bookmarks[0].id,
            collectionId: mocks[0].result.data.collections[0].id,
          },
        },
        result: () => {
          console.log('RESULT')
          bookmarkRemoved = true
          return { data: { removeBookmark: {} } }
        },
      },
    ]
    */

    jest.useFakeTimers()

    render(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const buttons = await screen.findAllByRole('button', {
      name: 'Remove this bookmark',
    })

    userEvent.click(buttons[0])

    // Wrapping this in act due to https://github.com/apollographql/apollo-client/issues/5920
    await act(async () => {
      jest.runAllTimers()
    })

    jest.useRealTimers()

    expect(mockRemoveBookmark).toHaveBeenCalledWith({
      variables: {
        _id: getCollectionsMock[0].result.data.collections[0].bookmarks[0]._id,
        collectionId: getCollectionsMock[0].result.data.collections[0]._id,
      },
      refetchQueries: [`getCollections`],
    })
  })

  it('handles the add bookmark operation', async () => {
    renderWithModalRoot(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
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

    expect(mockAddBookmark).toHaveBeenCalledWith({
      variables: {
        collectionId: getCollectionsMock[0].result.data.collections[0]._id,
        url: 'http://www.example.com',
        label: 'My Custom Link',
      },
      refetchQueries: [`getCollections`],
    })
  })

  it('handles the edit collection title operation', async () => {
    render(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const editTitleButton = await screen.findByRole('button', {
      name: 'Edit collection title',
    })
    userEvent.click(editTitleButton)
    const input = screen.getByRole('textbox')
    userEvent.clear(input)
    userEvent.type(input, 'Updated Title{enter}')

    expect(mockEditCollection).toHaveBeenCalledWith({
      variables: {
        _id: getCollectionsMock[0].result.data.collections[0]._id,
        title: 'Updated Title',
      },
    })
  })

  it('handles the remove collection operation', async () => {
    renderWithModalRoot(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const dropdownMenu = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    userEvent.click(dropdownMenu)
    userEvent.click(screen.getByRole('button', { name: 'Delete Collection' }))
    userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(mockRemoveCollection).toHaveBeenCalledWith({
      variables: {
        _id: getCollectionsMock[0].result.data.collections[0]._id,
      },
      refetchQueries: [`getCollections`],
    })
  })

  it('handles the add collection operation', async () => {
    render(
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    userEvent.click(await screen.findByRole('button', { name: 'Add section' }))
    userEvent.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )
    expect(mockAddCollection).toHaveBeenCalledWith({
      variables: {
        title: '',
        bookmarks: [],
      },
      refetchQueries: [`getCollections`],
    })
  })
})
