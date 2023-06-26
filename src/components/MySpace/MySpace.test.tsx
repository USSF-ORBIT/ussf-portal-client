/**
 * @jest-environment jsdom
 */
import { act, screen, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { mockFlags } from 'jest-launchdarkly-mock'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { axe } from 'jest-axe'
import { ObjectId } from 'mongodb'
import {
  renderWithModalRoot,
  renderWithMySpaceAndModalContext,
} from '../../testHelpers'
import '../../__mocks__/mockMatchMedia'
import {
  portalUserMaxedOutCollection,
  portalUserCollectionLimit,
  portalUserGuardianIdeal,
  portalUserCollectionLimitWithAllAdditionalWidgets,
  portalUserWithExampleCollection,
} from '../../__fixtures__/authUsers'
import { cmsBookmarksMock } from '../../__fixtures__/data/cmsBookmarks'
import MySpace from './MySpace'

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
      html = renderWithMySpaceAndModalContext(
        <MySpace bookmarks={cmsBookmarksMock} />,
        {
          mySpace: [...portalUserMaxedOutCollection.mySpace],
        }
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
        await screen.findByRole('button', { name: 'Add widget' })
      ).toBeInTheDocument()
    })

    test('disables adding a news widget if there is already a news widget', async () => {
      const user = userEvent.setup()

      expect(
        await screen.findByRole('button', { name: 'Add widget' })
      ).toBeInTheDocument()

      await user.click(
        await screen.findByRole('button', { name: 'Add widget' })
      )
      expect(
        screen.queryByRole('button', {
          name: 'Add news widget',
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

    renderWithMySpaceAndModalContext(<MySpace bookmarks={cmsBookmarksMock} />, {
      mySpace: [...portalUserCollectionLimit.mySpace],
    })

    expect(
      await screen.findByRole('button', { name: 'Add widget' })
    ).toBeInTheDocument()

    await user.click(await screen.findByRole('button', { name: 'Add widget' }))
    expect(
      screen.queryByRole('button', {
        name: 'Add news widget',
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

    renderWithMySpaceAndModalContext(<MySpace bookmarks={cmsBookmarksMock} />, {
      mySpace: [...portalUserGuardianIdeal.mySpace],
    })

    await waitFor(() =>
      expect(
        screen.getByText('Connect in a Collaborative Environment')
      ).toBeInTheDocument()
    )
  })

  test('does not render the add widget component if there are 25 collections, news, featured shortcuts, and guardian ideal', async () => {
    renderWithMySpaceAndModalContext(<MySpace bookmarks={cmsBookmarksMock} />, {
      mySpace: [...portalUserCollectionLimitWithAllAdditionalWidgets.mySpace],
    })

    expect(
      screen.queryByRole('button', { name: 'Add widget' })
    ).not.toBeInTheDocument()
  })

  test('navigates to Sites & Applications when adding new existing collections', async () => {
    const user = userEvent.setup()

    renderWithMySpaceAndModalContext(<MySpace bookmarks={cmsBookmarksMock} />, {
      mySpace: [portalUserWithExampleCollection.mySpace[0]],
    })

    await user.click(await screen.findByRole('button', { name: 'Add widget' }))
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
          refetchQueries: [`getUser`],
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

    renderWithMySpaceAndModalContext(
      <MySpace bookmarks={cmsBookmarksMock} />,
      { mySpace: [...portalUserMaxedOutCollection.mySpace] },
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
            collectionId: portalUserWithExampleCollection.mySpace[0]._id,
            url: 'www.example.com/15',
            label: 'LeaveWeb',
            cmsId: '15',
          },
        },
        result: () => {
          bookmarkAdded = true
          return {
            data: {
              addBookmark: {
                _id: ObjectId(),
                cmsId: '15',
                url: 'www.example.com/15',
                label: 'LeaveWeb',
              },
            },
          }
        },
      },
    ]

    renderWithMySpaceAndModalContext(
      <MySpace bookmarks={cmsBookmarksMock} />,
      { mySpace: [...portalUserWithExampleCollection.mySpace] },
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
    await user.click(screen.getByRole('option', { name: 'LeaveWeb' }))

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

    renderWithMySpaceAndModalContext(
      <MySpace bookmarks={cmsBookmarksMock} />,
      {
        mySpace: [...portalUserMaxedOutCollection.mySpace],
        disableDragAndDrop: true,
      },
      editCollectionMock,
      { portalUser: portalUserMaxedOutCollection }
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
    await user.type(input, 'Updated Title')

    expect(input).toHaveValue('Updated Title')

    // Hitting 'Enter' no longer works because of dnd-kit, so we need to click the button
    await user.click(screen.getByRole('button', { name: 'Save name' }))

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    )
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

    renderWithMySpaceAndModalContext(
      <MySpace bookmarks={cmsBookmarksMock} />,
      {
        mySpace: [...portalUserMaxedOutCollection.mySpace],
      },
      removeCollectionMock,
      { portalUser: portalUserMaxedOutCollection },
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
  })

  test('handles the add collection operation', async () => {
    const user = userEvent.setup()
    const mockAddNewCollection = jest.fn()

    renderWithMySpaceAndModalContext(<MySpace bookmarks={cmsBookmarksMock} />, {
      mySpace: [...portalUserMaxedOutCollection.mySpace],
      addNewCollection: mockAddNewCollection,
    })

    await user.click(await screen.findByRole('button', { name: 'Add widget' }))
    await user.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    expect(mockAddNewCollection).toHaveBeenCalled()
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
    const userMySpace: any = portalUserWithExampleCollection.mySpace[0]
    const customBookmarkId = userMySpace.bookmarks?.[3]._id
    const collectionId = portalUserWithExampleCollection.mySpace[0]._id
    const editBookmarkMock = [
      {
        request: {
          query: EditBookmarkDocument,
          variables: {
            _id: customBookmarkId,
            collectionId: collectionId,
            url: 'https://www.yahoo.com',
            label: 'Yahoo',
          },
        },
        result: () => {
          return {
            data: {
              editBookmark: {
                _id: customBookmarkId,
                url: 'https://www.yahoo.com',
                label: 'Yahoo',
              },
            },
          }
        },
      },
    ]

    renderWithMySpaceAndModalContext(
      <MySpace bookmarks={cmsBookmarksMock} />,
      {
        mySpace: [...portalUserWithExampleCollection.mySpace],
      },
      editBookmarkMock,
      { portalUser: portalUserWithExampleCollection },
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
  })
})
