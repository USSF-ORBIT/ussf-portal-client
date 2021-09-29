/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'
import { MockedProvider } from '@apollo/client/testing'

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
      <MockedProvider>
        <CustomCollection
          {...exampleCollection}
          handleRemoveBookmark={jest.fn()}
        />
      </MockedProvider>
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
})

describe('RemovableBookmark component', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  const testBookmark = exampleCollection.bookmarks[0]

  it('renders a bookmark with a delete handler', () => {
    render(
      <MockedProvider>
        <RemovableBookmark bookmark={testBookmark} handleRemove={jest.fn()} />
      </MockedProvider>
    )

    expect(screen.getByRole('link')).toHaveTextContent(testBookmark.label)
    expect(
      screen.getByRole('button', { name: 'Remove this bookmark' })
    ).toBeInTheDocument()
  })

  it('allows the delete handler to be undone', async () => {
    jest.useFakeTimers()

    const mockHandleRemove = jest.fn()

    render(
      <MockedProvider>
        <RemovableBookmark
          bookmark={testBookmark}
          handleRemove={mockHandleRemove}
        />
      </MockedProvider>
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
      <MockedProvider>
        <RemovableBookmark
          bookmark={testBookmark}
          handleRemove={mockHandleRemove}
        />
      </MockedProvider>
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
