/**
 * @jest-environment jsdom
 */

import { act, screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'

import { renderWithModalRoot } from '../../testHelpers'
import MySpace from './MySpace'

import { GET_COLLECTIONS } from 'operations/queries/getCollections'

const mockRouterPush = jest.fn()
const mockAddBookmark = jest.fn()
const mockRemoveBookmark = jest.fn()
const mockRemoveCollection = jest.fn()

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

jest.mock('operations/mutations/removeCollection', () => ({
  useRemoveCollectionMutation: () => [mockRemoveCollection],
}))

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: [
          {
            id: v4(),
            title: 'Example Collection',
            bookmarks: [
              {
                id: v4(),
                url: 'https://google.com',
                label: 'Webmail',
                description: 'Lorem ipsum',
              },
              {
                id: v4(),
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                description: 'Lorem ipsum',
              },
              {
                id: v4(),
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                description: 'Lorem ipsum',
              },
            ],
          },
        ],
      },
    },
  },
]

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
        <MockedProvider mocks={mocks} addTypename={false}>
          <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
        </MockedProvider>
      )
    })

    it('renders without error ', async () => {
      // Because MockedProvider is async/promise-based,
      // the test always completes when in the loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render the collection', async () => {
      const collection = await screen.findByRole('heading', { level: 3 })
      expect(collection).toHaveTextContent(
        mocks[0].result.data.collections[0].title
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
        <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
      </MockedProvider>
    )

    expect(await screen.findByText('Error')).toBeInTheDocument()
  })

  it('navigates to Sites & Applications when adding new existing collections', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
      </MockedProvider>
    )

    userEvent.click(await screen.findByRole('button', { name: 'Add section' }))
    userEvent.click(
      await screen.findByRole('button', {
        name: 'Select existing collection(s)',
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
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
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
        id: mocks[0].result.data.collections[0].bookmarks[0].id,
        collectionId: mocks[0].result.data.collections[0].id,
      },
    })
  })

  it('handles the add bookmark operation', async () => {
    renderWithModalRoot(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
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
        collectionId: mocks[0].result.data.collections[0].id,
        url: 'http://www.example.com',
        label: 'My Custom Link',
      },
    })
  })

  it('handles the remove collection operation', async () => {
    renderWithModalRoot(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySpace bookmarks={mocks[0].result.data.collections[0].bookmarks} />
      </MockedProvider>
    )

    const collectionDropdown = await screen.findByRole('button', {
      name: 'Collection Settings',
    })

    userEvent.click(collectionDropdown)
    userEvent.click(screen.getByRole('button', { name: 'Delete Collection' }))
    userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(mockRemoveCollection).toHaveBeenCalledWith({
      variables: {
        id: mocks[0].result.data.collections[0].id,
      },
    })
  })
})
