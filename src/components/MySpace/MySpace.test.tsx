/**
 * @jest-environment jsdom
 */
import { act, screen, render, within } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'

import { renderWithModalRoot } from '../../testHelpers'
import {
  getMySpaceMock,
  getMySpaceMaximumCollectionsMock,
} from '../../__fixtures__/operations/getMySpace'
import { cmsCollectionsMock } from '../../__fixtures__/data/cmsCollections'
import MySpace from './MySpace'

import { GET_MY_SPACE } from 'operations/queries/getMySpace'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { REMOVE_COLLECTION } from 'operations/mutations/removeCollection'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { EDIT_COLLECTION } from 'operations/mutations/editCollection'
import { EDIT_BOOKMARK } from 'operations/mutations/editBookmark'

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
        <MockedProvider mocks={getMySpaceMock} addTypename={false}>
          <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
        </MockedProvider>
      )
    })

    it('renders without error ', async () => {
      // Because MockedProvider is async/promise-based,
      // the test always completes when in the loading state
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('should render the collections', async () => {
      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: getMySpaceMock[0].result.data.mySpace[0].title,
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: getMySpaceMock[0].result.data.mySpace[1].title,
        })
      ).toBeInTheDocument()

      expect(await screen.findAllByRole('list')).toHaveLength(22)
      expect(await screen.findAllByRole('listitem')).toHaveLength(13)
      expect(await screen.findAllByRole('link')).toHaveLength(13)
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
          query: GET_MY_SPACE,
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

  it('does not render the add widget component if there are 25 sections', async () => {
    render(
      <MockedProvider
        mocks={getMySpaceMaximumCollectionsMock}
        addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    expect(
      screen.queryByRole('button', { name: 'Add section' })
    ).not.toBeInTheDocument()
  })

  it('navigates to Sites & Applications when adding new existing collections', async () => {
    render(
      <MockedProvider mocks={getMySpaceMock} addTypename={false}>
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
      ...getMySpaceMock,
      {
        request: {
          query: REMOVE_BOOKMARK,
          variables: {
            _id: getMySpaceMock[0].result.data.mySpace[0].bookmarks[1]._id,
            collectionId: getMySpaceMock[0].result.data.mySpace[0]._id,
            cmsId: '1',
          },
          refetchQueries: [`getCollections`],
        },
        result: () => {
          bookmarkRemoved = true
          return {
            data: {
              removeBookmark: {
                _id: getMySpaceMock[0].result.data.mySpace[0]._id,
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
      name: 'Remove this link',
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
      ...getMySpaceMock,
      {
        request: {
          query: ADD_BOOKMARK,
          variables: {
            collectionId: getMySpaceMock[0].result.data.mySpace[0]._id,
            url: 'https://mypay.dfas.mil/#/',
            label: 'MyPay',
            cmsId: '2',
          },
        },
        result: () => {
          bookmarkAdded = true
          return {
            data: {
              addBookmark: {
                _id: '100',
                cmsId: '2',
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
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

    const addLinkButtons = await screen.findAllByRole('button', {
      name: '+ Add link',
    })

    const addLinkButton = addLinkButtons[0]
    userEvent.click(addLinkButton)

    userEvent.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    userEvent.click(screen.getByRole('option', { name: 'MyPay' }))

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response
    expect(bookmarkAdded).toBe(true)
  })

  it('handles the edit collection title operation', async () => {
    let collectionEdited = false
    const editCollectionMock = [
      ...getMySpaceMock,
      {
        request: {
          query: EDIT_COLLECTION,
          variables: {
            _id: getMySpaceMock[0].result.data.mySpace[0]._id,
            title: 'Updated Title',
          },
        },
        result: () => {
          collectionEdited = true
          return {
            data: {
              editCollection: {
                _id: getMySpaceMock[0].result.data.mySpace[0]._id,
                title: 'Updated Title',
                bookmarks: getMySpaceMock[0].result.data.mySpace[0].bookmarks,
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

    const settings = await screen.findAllByRole('button', {
      name: 'Collection Settings',
    })

    const settingsBtn = settings[0]
    userEvent.click(settingsBtn)

    const edit = await screen.getAllByRole('button', {
      name: 'Edit collection title',
    })[0]
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
      ...getMySpaceMock,
      {
        request: {
          query: REMOVE_COLLECTION,
          variables: {
            _id: getMySpaceMock[0].result.data.mySpace[0]._id,
          },
        },
        result: () => {
          collectionRemoved = true
          return {
            data: {
              removeCollection: {
                _id: getMySpaceMock[0].result.data.mySpace[0]._id,
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

    const dropdownMenu = await screen.findAllByRole('button', {
      name: 'Collection Settings',
    })

    userEvent.click(dropdownMenu[0])
    userEvent.click(
      screen.getByRole('button', { name: 'Delete this collection' })
    )
    const removeCollectionModals = screen.getAllByRole('dialog', {
      name: 'Are you sure you’d like to delete this collection from My Space?',
    })

    const removeCollectionModal = removeCollectionModals[0]
    expect(removeCollectionModal).toHaveClass('is-visible')
    userEvent.click(
      within(removeCollectionModal).getByRole('button', { name: 'Delete' })
    )

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response

    expect(collectionRemoved).toBe(true)
  })

  it('handles the add collection operation', async () => {
    let collectionAdded = false
    const addCollectionMock = [
      ...getMySpaceMock,
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

  it('handles the edit bookmark operation', async () => {
    let bookmarkEdited = false

    const editBookmarkMock = [
      ...getMySpaceMock,
      {
        request: {
          query: EDIT_BOOKMARK,
          variables: {
            _id: getMySpaceMock[0].result.data.mySpace[0].bookmarks[0]._id,
            collectionId: getMySpaceMock[0].result.data.mySpace[0]._id,
            url: 'https://www.yahoo.com',
            label: 'Yahoo',
          },
        },
        result: () => {
          bookmarkEdited = true
          return {
            data: {
              editBookmark: {
                _id: getMySpaceMock[0].result.data.mySpace[0].bookmarks[0]._id,
                url: 'https://www.yahoo.com',
                label: 'Yahoo',
              },
            },
          }
        },
      },
    ]

    renderWithModalRoot(
      <MockedProvider mocks={editBookmarkMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    const editButton = await screen.findByRole('button', {
      name: 'Edit this link',
    })
    userEvent.click(editButton)

    const editModal = await screen.findByRole('dialog', {
      name: 'Edit custom link',
    })

    expect(editModal).toBeVisible()
    const nameInput = within(editModal).getByLabelText('Name')
    const urlInput = within(editModal).getByLabelText('URL')

    userEvent.clear(nameInput)
    userEvent.clear(urlInput)
    userEvent.type(nameInput, 'Yahoo')
    userEvent.type(urlInput, '{clear}https://www.yahoo.com')
    userEvent.click(
      within(editModal).getByRole('button', { name: 'Save custom link' })
    )

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    )

    expect(bookmarkEdited).toBe(true)
  })
})
