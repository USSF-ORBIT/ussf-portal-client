/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ObjectId } from 'mongodb'

import { RemovableBookmark } from './RemovableBookmark'

const testBookmark = {
  _id: new ObjectId(),
  url: 'https://google.com',
  label: 'Webmail',
  description: 'Lorem ipsum',
}

describe('RemovableBookmark component', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders a bookmark with a delete handler', () => {
    render(
      <RemovableBookmark bookmark={testBookmark} handleRemove={jest.fn()} />
    )

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(
      screen.getByRole('button', { name: 'Remove this bookmark' })
    ).toBeInTheDocument()
  })

  it('renders the bookmark URL if there is no label', () => {
    const testBookmarkNoLabel = {
      _id: new ObjectId(),
      url: 'https://example.com',
    }

    render(
      <RemovableBookmark
        bookmark={testBookmarkNoLabel}
        handleRemove={jest.fn()}
      />
    )

    expect(screen.getByRole('link')).toHaveTextContent(testBookmarkNoLabel.url)
  })

  it('allows the delete handler to be undone', async () => {
    jest.useFakeTimers()

    const mockHandleRemove = jest.fn()

    render(
      <RemovableBookmark
        bookmark={testBookmark}
        handleRemove={mockHandleRemove}
      />
    )

    const deleteButton = screen.getByRole('button', {
      name: 'Remove this bookmark',
    })
    userEvent.click(deleteButton)

    const undoButton = screen.getByRole('button', { name: 'Undo remove' })
    expect(undoButton).toBeInTheDocument()
    expect(deleteButton).not.toBeInTheDocument()
    userEvent.click(undoButton)

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(undoButton).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Remove this bookmark',
      })
    ).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    expect(mockHandleRemove).not.toHaveBeenCalled()
  })

  it('handles the delete button if not undone', () => {
    jest.useFakeTimers()

    const mockHandleRemove = jest.fn()

    render(
      <RemovableBookmark
        bookmark={testBookmark}
        handleRemove={mockHandleRemove}
      />
    )

    const deleteButton = screen.getByRole('button', {
      name: 'Remove this bookmark',
    })
    userEvent.click(deleteButton)

    const undoButton = screen.getByRole('button', { name: 'Undo remove' })
    expect(undoButton).toBeInTheDocument()
    expect(deleteButton).not.toBeInTheDocument()

    jest.runAllTimers()

    expect(mockHandleRemove).toHaveBeenCalled()
  })
})
