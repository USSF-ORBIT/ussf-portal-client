/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'

import CustomCollection, { RemovableBookmark } from './CustomCollection'

const exampleCollection = {
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
}

describe('CustomCollection component', () => {
  it('renders the collection with delete buttons', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
      />
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      exampleCollection.title
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(screen.getAllByRole('link')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(
      screen.getAllByRole('button', { name: 'Remove this bookmark' })
    ).toHaveLength(exampleCollection.bookmarks.length)
  })

  it('renders an Add Link toggleable form', () => {
    const mockAddLink = jest.fn()
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={mockAddLink}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInTheDocument()
    userEvent.type(urlInput, 'example')
    expect(urlInput).toBeInvalid()
    userEvent.type(urlInput, 'http://www.example.com')
    expect(urlInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Add site' }))
    expect(mockAddLink).toHaveBeenCalled()
  })
})

describe('RemovableBookmark component', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  const testBookmark = exampleCollection.bookmarks[0]

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
      id: v4(),
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
