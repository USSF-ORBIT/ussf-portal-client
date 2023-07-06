/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'mongodb'
import React from 'react'

import { renderWithModalRoot } from '../../../testHelpers'

import { CustomBookmark } from './CustomBookmark'

const testBookmark = {
  _id: ObjectId(),
  url: 'https://google.com',
  label: 'Webmail',
}

const testWidgetId = ObjectId()

const testCollectionTitle = 'Test Collection Title'

describe('CustomBookmark component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a bookmark with an edit handler', async () => {
    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        collectionTitle={testCollectionTitle}
      />
    )
    await screen.findByText(testBookmark.label)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(
      screen.getByRole('button', {
        name: `edit ${testBookmark.label} bookmark`,
      })
    ).toBeInTheDocument()
  })

  it('renders the bookmark URL if there is no label', async () => {
    const testBookmarkNoLabel = {
      _id: ObjectId(),
      url: 'https://example.com',
    }

    render(
      <CustomBookmark
        bookmark={testBookmarkNoLabel}
        widgetId={testWidgetId}
        collectionTitle={testCollectionTitle}
      />
    )
    await screen.findByText(testBookmarkNoLabel.url)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmarkNoLabel.url)
  })

  it('calls each function associated with editing a bookmark', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()
    const mockUpdateBookmark = jest.fn()
    const mockModalRef = jest.spyOn(React, 'useRef')

    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        collectionTitle={testCollectionTitle}
      />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
        updateBookmark: mockUpdateBookmark,
        modalRef: mockModalRef,
      }
    )

    const editButton = await screen.findByRole('button', {
      name: 'edit Webmail bookmark',
    })
    await user.click(editButton)

    expect(mockUpdateModalId).toHaveBeenCalledWith('editCustomLinkModal')
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Edit custom link',
    })

    expect(mockUpdateWidget).toHaveBeenCalledWith({
      _id: testWidgetId,
      title: testCollectionTitle,
      type: 'Collection',
    })
    expect(mockUpdateBookmark).toHaveBeenCalledWith(testBookmark)

    expect(mockModalRef).toHaveBeenCalled()
  })
})
