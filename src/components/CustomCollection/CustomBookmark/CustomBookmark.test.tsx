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

const testHandlers = {
  onSave: jest.fn(),
  onDelete: jest.fn(),
}

describe('CustomBookmark component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a bookmark with an edit handler', async () => {
    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        {...testHandlers}
      />
    )
    await screen.findByText(testBookmark.label)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(
      screen.getByRole('button', { name: 'Edit this link' })
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
        {...testHandlers}
      />
    )
    await screen.findByText(testBookmarkNoLabel.url)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmarkNoLabel.url)
  })

  it('can save the bookmark', async () => {
    const user = userEvent.setup()

    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        {...testHandlers}
      />
    )

    const editButton = await screen.findByRole('button', {
      name: 'Edit this link',
    })
    await user.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const saveButton = screen.getByRole('button', { name: 'Save custom link' })
    expect(saveButton).toBeInTheDocument()
    await user.click(saveButton)
    expect(testHandlers.onSave).toHaveBeenCalled()
  })

  it('can delete the bookmark', async () => {
    const user = userEvent.setup()

    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        {...testHandlers}
      />
    )

    const editButton = await screen.findByRole('button', {
      name: 'Edit this link',
    })
    await user.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect(deleteButton).toBeInTheDocument()
    await user.click(deleteButton)
    expect(testHandlers.onDelete).toHaveBeenCalled()
  })

  it('can start editing and cancel', async () => {
    const user = userEvent.setup()

    renderWithModalRoot(
      <CustomBookmark
        bookmark={testBookmark}
        widgetId={testWidgetId}
        {...testHandlers}
      />
    )

    const editButton = await screen.findByRole('button', {
      name: 'Edit this link',
    })
    await user.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    await user.click(cancelButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).toHaveClass('is-hidden')
    expect(testHandlers.onSave).not.toHaveBeenCalled()
    expect(testHandlers.onDelete).not.toHaveBeenCalled()
  })
})
