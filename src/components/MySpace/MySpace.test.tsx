/**
 * @jest-environment jsdom
 */
import { act, screen, render, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { mockFlags } from 'jest-launchdarkly-mock'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import { ObjectId } from 'mongodb'
import { renderWithModalRoot, renderWithAuthAndApollo } from '../../testHelpers'
import '../../__mocks__/mockMatchMedia'

import { getMySpaceMock } from '../../__fixtures__/operations/getMySpace'
import {
  portalUserMaxedOutCollection,
  portalUserCollectionLimit,
  portalUserGuardianIdeal,
  portalUserCollectionLimitWithAllAdditionalWidgets,
} from '../../__fixtures__/authUsers'
import { cmsCollectionsMock } from '../../__fixtures__/data/cmsCollections'
import MySpace from './MySpace'

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
      html = renderWithAuthAndApollo(
        <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
        { portalUser: portalUserMaxedOutCollection }
      )
    })

    test('should render all widgets', async () => {
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
    })

    test('renders the add widget component', async () => {
      expect(
        await screen.findByRole('button', { name: 'Add section' })
      ).toBeInTheDocument()
    })

    test('disables adding a news section if there is already a news section', async () => {
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

    test('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })

  test('disables adding more collections if there are 25 collections', async () => {
    const user = userEvent.setup()

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserCollectionLimit }
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

  test('displays the Guardian Ideal widget', async () => {
    mockFlags({
      guardianIdealCarousel: true,
    })

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserGuardianIdeal }
    )

    await waitFor(() =>
      expect(
        screen.getByText('Connect in a Collaborative Environment')
      ).toBeInTheDocument()
    )
  })

  test('does not render the add widget component if there are 25 collections, news, featured shortcuts, and guardian ideal', async () => {
    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserCollectionLimitWithAllAdditionalWidgets }
    )

    expect(
      screen.queryByRole('button', { name: 'Add section' })
    ).not.toBeInTheDocument()
  })

  test('navigates to Sites & Applications when adding new existing collections', async () => {
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

  test('handles the remove bookmark operation', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    let bookmarkRemoved = false

    // Note: Leaving this as 'any' for now. MySpaceWidget is a union type between
    // Widget and Collection, and since 'bookmarks' does not exist on Widget, it kept
    // showing an error here.
    const userMySpace: any = portalUserMaxedOutCollection.mySpace[0]
    const bookmarkId = userMySpace.bookmarks?.[1]._id

    const collectionId = portalUserMaxedOutCollection.mySpace[0]._id

    const mocksWithRemove = [
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

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserMaxedOutCollection },
      mocksWithRemove
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

  test('handles the add bookmark operation', async () => {
    const user = userEvent.setup()

    let bookmarkAdded = false
    const addBookmarkMock = [
      {
        request: {
          query: AddBookmarkDocument,
          variables: {
            collectionId: portalUserMaxedOutCollection.mySpace[0]._id,
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

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserMaxedOutCollection },
      addBookmarkMock
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

  test('handles the edit collection title operation', async () => {
    const user = userEvent.setup()

    let collectionEdited = false
    const collectionId = portalUserMaxedOutCollection.mySpace[0]._id

    const editCollectionMock = [
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
                title: 'Updated Title',
              },
            },
          }
        },
      },
    ]

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserMaxedOutCollection },
      editCollectionMock
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

  test('handles the remove collection operation', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    const collectionId = portalUserMaxedOutCollection.mySpace[0]._id

    const removeCollectionMock = [
      {
        request: {
          query: RemoveCollectionDocument,
          variables: {
            _id: collectionId,
          },
        },
        result: () => {
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
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
      },
      removeCollectionMock,
      { portalUser: portalUserMaxedOutCollection }
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
  })

  test('handles the add collection operation', async () => {
    const user = userEvent.setup()

    let collectionAdded = false
    const addCollectionMock = [
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

    renderWithAuthAndApollo(
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      { portalUser: portalUserMaxedOutCollection },
      addCollectionMock
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

  test('handles the edit bookmark operation', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()
    const mockUpdateBookmark = jest.fn()

    // Note: Leaving this as 'any' for now. MySpaceWidget is a union type between
    // Widget and Collection, and since 'bookmarks' does not exist on Widget, it kept
    // showing an error here.
    const userMySpace: any = portalUserMaxedOutCollection.mySpace[0]
    const bookmarkId = userMySpace.bookmarks?.[0]._id
    const collectionId = portalUserMaxedOutCollection.mySpace[0]._id
    const editBookmarkMock = [
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
      <MySpace bookmarks={cmsCollectionsMock[0].bookmarks} />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
        updateBookmark: mockUpdateBookmark,
      },
      editBookmarkMock,
      { portalUser: portalUserMaxedOutCollection }
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
  })
})
