/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'bson'
import React from 'react'

import { renderWithModalRoot } from '../../testHelpers'

import { CustomBookmark } from './CustomBookmark'

const testBookmark = {
  _id: new ObjectId('1'),
  url: 'https://google.com',
  label: 'Webmail',
}

const testHandlers = {
  onSave: jest.fn(),
  onDelete: jest.fn(),
}

describe('CustomBookmark component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a bookmark with an edit handler', () => {
    renderWithModalRoot(
      <CustomBookmark bookmark={testBookmark} {...testHandlers} />
    )

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(
      screen.getByRole('button', { name: 'Edit this link' })
    ).toBeInTheDocument()
  })

  it('renders the bookmark URL if there is no label', () => {
    const testBookmarkNoLabel = {
      _id: new ObjectId('1'),
      url: 'https://example.com',
    }

    render(<CustomBookmark bookmark={testBookmarkNoLabel} {...testHandlers} />)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmarkNoLabel.url)
  })

  it('can save the bookmark', () => {
    renderWithModalRoot(
      <CustomBookmark bookmark={testBookmark} {...testHandlers} />
    )

    const editButton = screen.getByRole('button', { name: 'Edit this link' })
    userEvent.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const saveButton = screen.getByRole('button', { name: 'Save custom link' })
    expect(saveButton).toBeInTheDocument()
    userEvent.click(saveButton)
    expect(testHandlers.onSave).toHaveBeenCalled()
  })

  it('can delete the bookmark', () => {
    renderWithModalRoot(
      <CustomBookmark bookmark={testBookmark} {...testHandlers} />
    )

    const editButton = screen.getByRole('button', { name: 'Edit this link' })
    userEvent.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect(deleteButton).toBeInTheDocument()
    userEvent.click(deleteButton)
    expect(testHandlers.onDelete).toHaveBeenCalled()
  })

  it('can start editing and cancel', () => {
    renderWithModalRoot(
      <CustomBookmark bookmark={testBookmark} {...testHandlers} />
    )

    const editButton = screen.getByRole('button', { name: 'Edit this link' })
    userEvent.click(editButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).not.toHaveClass('is-hidden')

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    userEvent.click(cancelButton)
    expect(
      screen.getByRole('dialog', { name: 'Edit custom link' })
    ).toHaveClass('is-hidden')
    expect(testHandlers.onSave).not.toHaveBeenCalled()
    expect(testHandlers.onDelete).not.toHaveBeenCalled()
  })
})
