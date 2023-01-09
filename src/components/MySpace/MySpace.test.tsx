/**
 * @jest-environment jsdom
 */
import { act, screen, render, within } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import { ObjectId } from 'mongodb'
import { renderWithModalRoot } from '../../testHelpers'

import {
  getMySpaceMock,
  getMySpaceMaximumCollectionsMock,
  getMySpaceMaximumCollectionsWithNewsMock,
} from '../../__fixtures__/operations/getMySpace'
import { cmsCollectionsMock } from '../../__fixtures__/data/cmsCollections'
import MySpace from './MySpace'

import { GetMySpaceDocument } from 'operations/portal/queries/getMySpace.g'
import { AddCollectionDocument } from 'operations/portal/mutations/addCollection.g'
import { EditCollectionDocument } from 'operations/portal/mutations/editCollection.g'
import { RemoveCollectionDocument } from 'operations/portal/mutations/removeCollection.g'
import { AddBookmarkDocument } from 'operations/portal/mutations/addBookmark.g'
import { RemoveBookmarkDocument } from 'operations/portal/mutations/removeBookmark.g'
import { EditBookmarkDocument } from 'operations/portal/mutations/editBookmark.g'

import { mockRssFeedTen } from '__mocks__/news-rss'

const mockRouterPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}))

jest.mock('axios', () => ({
  get: () => {
    return Promise.resolve({ data: mockRssFeedTen })
  },
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

    it('should render all widgets', async () => {
      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Example Collection',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Maxed Out Collection',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Recent News',
        })
      ).toBeInTheDocument()

      // 21 Collection widgets
      expect(await screen.findAllByRole('list')).toHaveLength(22)
      // Total of 35 Bookmarks
      expect(await screen.findAllByRole('listitem')).toHaveLength(35)
    })

    it('renders the add widget component', async () => {
      expect(
        await screen.findByRole('button', { name: 'Add section' })
      ).toBeInTheDocument()
    })

    it('disables adding a news section if there is already a news section', async () => {
      const user = userEvent.setup()

      expect(
        await screen.findByRole('button', { name: 'Add section' })
      ).toBeInTheDocument()

      await user.click(
        await screen.findByRole('button', { name: 'Add section' })
      )
      expect(
        screen.queryByRole('button', {
          name: 'Add news section',
        })
      ).toBeDisabled()
      expect(
        screen.queryByRole('button', {
          name: 'Select collection from template',
        })
      ).toBeEnabled()
      expect(
        screen.queryByRole('button', {
          name: 'Create new collection',
        })
      ).toBeEnabled()
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
          query: GetMySpaceDocument,
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

  it('disables adding more collections if there are 25 collections', async () => {
    const user = userEvent.setup()

    render(
      <MockedProvider
        mocks={getMySpaceMaximumCollectionsMock}
        addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    expect(
      await screen.findByRole('button', { name: 'Add section' })
    ).toBeInTheDocument()

    await user.click(await screen.findByRole('button', { name: 'Add section' }))
    expect(
      screen.queryByRole('button', {
        name: 'Add news section',
      })
    ).toBeEnabled()
    expect(
      screen.queryByRole('button', {
        name: 'Select collection from template',
      })
    ).toBeDisabled()
    expect(
      screen.queryByRole('button', {
        name: 'Create new collection',
      })
    ).toBeDisabled()
  })

  it('does not render the add widget component if there are 25 collections and news', async () => {
    render(
      <MockedProvider
        mocks={getMySpaceMaximumCollectionsWithNewsMock}
        addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    expect(
      screen.queryByRole('button', { name: 'Add section' })
    ).not.toBeInTheDocument()
  })

  it('navigates to Sites & Applications when adding new existing collections', async () => {
    const user = userEvent.setup()

    render(
      <MockedProvider mocks={getMySpaceMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>
    )

    await user.click(await screen.findByRole('button', { name: 'Add section' }))
    await user.click(
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
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    let bookmarkRemoved = false

    const bookmarkId =
      getMySpaceMock[0].result.data.mySpace[0].bookmarks?.[1]._id

    const collectionId = getMySpaceMock[0].result.data.mySpace[0]._id
    const mocksWithRemove = [
      ...getMySpaceMock,
      {
        request: {
          query: RemoveBookmarkDocument,
          variables: {
            _id: bookmarkId,
            collectionId: collectionId,
            cmsId: '1',
          },
          refetchQueries: [`getMySpace`],
        },
        result: () => {
          bookmarkRemoved = true
          return {
            data: {
              removeBookmark: {
                _id: bookmarkId,
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

    await user.click(buttons[0])

    await act(async () => {
      jest.runAllTimers()
    })

    expect(bookmarkRemoved).toBe(true)
  })

  it('handles the add bookmark operation', async () => {
    const user = userEvent.setup()

    let bookmarkAdded = false
    const addBookmarkMock = [
      ...getMySpaceMock,
      {
        request: {
          query: AddBookmarkDocument,
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
                _id: ObjectId(),
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
    await user.click(addLinkButton)

    await user.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    await user.click(screen.getByRole('option', { name: 'MyPay' }))

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response
    expect(bookmarkAdded).toBe(true)
  })

  it('handles the edit collection title operation', async () => {
    const user = userEvent.setup()

    let collectionEdited = false
    const collectionId = getMySpaceMock[0].result.data.mySpace[0]._id
    const editCollectionMock = [
      ...getMySpaceMock,
      {
        request: {
          query: EditCollectionDocument,
          variables: {
            _id: collectionId,
            title: 'Updated Title',
          },
        },
        result: () => {
          collectionEdited = true
          return {
            data: {
              editCollection: {
                _id: collectionId,
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
    await user.click(settingsBtn)

    const edit = screen.getAllByRole('button', {
      name: 'Edit collection title',
    })[0]
    await user.click(edit)

    const input = await screen.findByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Updated Title{enter}')

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response
    expect(collectionEdited).toBe(true)
  })

  it('handles the remove collection operation', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    let collectionRemoved = false
    const collectionId = getMySpaceMock[0].result.data.mySpace[0]._id
    const removeCollectionMock = [
      ...getMySpaceMock,
      {
        request: {
          query: RemoveCollectionDocument,
          variables: {
            _id: collectionId,
          },
        },
        result: () => {
          collectionRemoved = true
          return {
            data: {
              removeCollection: {
                _id: collectionId,
              },
            },
          }
        },
      },
    ]
    renderWithModalRoot(
      <MockedProvider mocks={removeCollectionMock} addTypename={false}>
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />
      </MockedProvider>,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
      }
    )

    const dropdownMenu = await screen.findAllByRole('button', {
      name: 'Collection Settings',
    })

    await user.click(dropdownMenu[0])
    await user.click(
      screen.getByRole('button', { name: 'Delete this collection' })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeCustomCollectionModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText:
        'Are you sure you’d like to delete this collection from My Space?',
      descriptionText: 'This action cannot be undone.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()

    // screen.debug()
    // const deleteButton = await screen.findAllByTestId('button', {})
    // await user.click(deleteButton[0])

    // await act(
    //   async () => await new Promise((resolve) => setTimeout(resolve, 0))
    // ) // wait for response

    // expect(collectionRemoved).toBe(true)
  })

  it('handles the add collection operation', async () => {
    const user = userEvent.setup()

    let collectionAdded = false
    const addCollectionMock = [
      ...getMySpaceMock,
      {
        request: {
          query: AddCollectionDocument,
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
                _id: ObjectId(),
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

    await user.click(await screen.findByRole('button', { name: 'Add section' }))
    await user.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ) // wait for response

    expect(collectionAdded).toBe(true)
  })

  it('handles the edit bookmark operation', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()
    const mockUpdateBookmark = jest.fn()

    let bookmarkEdited = false
    const bookmarkId =
      getMySpaceMock[0].result.data.mySpace[0].bookmarks?.[0]._id
    const collectionId = getMySpaceMock[0].result.data.mySpace[0]._id
    const editBookmarkMock = [
      ...getMySpaceMock,
      {
        request: {
          query: EditBookmarkDocument,
          variables: {
            _id: bookmarkId,
            collectionId: collectionId,
            url: 'https://www.yahoo.com',
            label: 'Yahoo',
          },
        },
        result: () => {
          bookmarkEdited = true
          return {
            data: {
              editBookmark: {
                _id: bookmarkId,
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
      </MockedProvider>,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
        updateBookmark: mockUpdateBookmark,
      }
    )

    const editButton = await screen.findByRole('button', {
      name: 'Edit this link',
    })
    await user.click(editButton)

    expect(mockUpdateModalId).toHaveBeenCalledWith('editCustomLinkModal')
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Edit custom link',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
    expect(mockUpdateBookmark).toHaveBeenCalled()

    // const editModal = await screen.findByRole('dialog', {
    //   name: 'Edit custom link',
    // })
    // const editModal = container.querySelector('#modal-root')

    // expect(editModal).toBeVisible()
    // const nameInput = within(editModal).getByLabelText('Name')
    // const urlInput = within(editModal).getByLabelText('URL')

    // await user.clear(nameInput)
    // await user.clear(urlInput)
    // await user.type(nameInput, 'Yahoo')
    // await user.type(urlInput, '{clear}https://www.yahoo.com')
    // await user.click(
    //   within(editModal).getByRole('button', { name: 'Save custom link' })
    // )

    // await act(
    //   async () => await new Promise((resolve) => setTimeout(resolve, 0))
    // )

    // expect(bookmarkEdited).toBe(true)
  })
})
