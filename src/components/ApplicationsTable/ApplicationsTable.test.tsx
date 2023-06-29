/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import { ObjectId } from 'mongodb'
import ApplicationsTable from './ApplicationsTable'
import type { Collection, CMSBookmark } from 'types'
import { WIDGET_TYPES } from 'constants/index'

const exampleBookmarks: CMSBookmark[] = [
  { id: '1', label: 'Webmail', url: '#' },
  { id: '2', label: 'MyPay', url: '#' },
  { id: '3', label: 'vMPF', url: '#' },
  {
    id: '4',
    label: 'AFFMS',
    url: '#',
    description: 'Air Force Fitness Management System',
  },
  {
    id: '5',
    label: 'AFIMS',
    url: '#',
    description: 'Air Force Incident Management System',
  },
  {
    id: '6',
    label: 'AFAMS',
    url: '#',
    description: 'Air Force Agency for Modeling and Simulation',
  },
  {
    id: '7',
    label: 'AFIMS',
    url: '#',
    description: 'Air Force Installation and Mission Support',
  },
]

const exampleInvalidBookmarks = [
  { id: '1', label: 'Webmail' },
  { id: '2', label: 'MyPay' },
  { id: '3', label: 'vMPF' },
  {
    id: '4',
    label: 'AFFMS',
    url: '#',
    description: 'Air Force Fitness Management System',
  },
  {
    id: '5',
    label: 'AFIMS',
    url: '#',
    description: 'Air Force Incident Management System',
  },
  {
    id: '6',
    label: 'AFAMS',
    url: '#',
    description: 'Air Force Agency for Modeling and Simulation',
  },
  {
    id: '7',
    label: 'AFIMS',
    url: '#',
    description: 'Air Force Installation and Mission Support',
  },
]
const collectionId = ObjectId()
const exampleCollections: Collection[] = [
  {
    _id: collectionId,
    title: 'Example Collection',
    type: WIDGET_TYPES.COLLECTION,
    bookmarks: [],
  },
]

const exampleCollectionWithoutTitle: Collection[] = [
  {
    _id: collectionId,
    title: '',
    type: WIDGET_TYPES.COLLECTION,
    bookmarks: [],
  },
]

const exampleCollectionsWithLimit: Collection[] = [
  {
    _id: collectionId,
    title: 'Example Collection',
    type: WIDGET_TYPES.COLLECTION,
    bookmarks: Array.from({ length: 10 }, (x, i) => ({
      _id: ObjectId(),
      label: `Bookmark ${i}`,
      url: '#',
    })),
  },
]

const mockAddToCollection = jest.fn()

describe('ApplicationsTable component', () => {
  test('renders a list of bookmark links', () => {
    render(
      <ApplicationsTable
        bookmarks={exampleBookmarks}
        handleAddToCollection={mockAddToCollection}
      />
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(7)
    expect(
      screen.getAllByRole('button', { name: 'Add to My Space Closed' })
    ).toHaveLength(7)
  })

  test('doesn’t render invalid bookmarks', () => {
    render(
      <ApplicationsTable
        handleAddToCollection={mockAddToCollection}
        bookmarks={exampleInvalidBookmarks as CMSBookmark[]}
      />
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(4)
  })

  test('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(
        <ApplicationsTable
          bookmarks={exampleBookmarks}
          handleAddToCollection={mockAddToCollection}
        />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('can add a bookmark to a new collection', async () => {
    const user = userEvent.setup()

    render(
      <ApplicationsTable
        bookmarks={exampleBookmarks}
        handleAddToCollection={mockAddToCollection}
        userCollectionOptions={exampleCollections}
      />
    )

    await user.click(
      screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
    )

    expect(
      screen.getByRole('button', { name: 'Add to My Space Open' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Add to new collection' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Add to new collection' })
    )

    expect(mockAddToCollection).toHaveBeenCalledWith(exampleBookmarks[0])

    expect(
      screen.queryByRole('button', { name: 'Add to My Space Open' })
    ).not.toBeInTheDocument()
  })

  test('cannot add a bookmark to a new collection if not allowed', async () => {
    const user = userEvent.setup()

    render(
      <ApplicationsTable
        bookmarks={exampleBookmarks}
        handleAddToCollection={mockAddToCollection}
        userCollectionOptions={exampleCollectionWithoutTitle}
        canAddNewCollection={false}
      />
    )

    await user.click(
      screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
    )

    expect(
      screen.getByRole('button', { name: 'Add to My Space Open' })
    ).toBeInTheDocument()

    expect(screen.getByText('Untitled Collection')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Add to new collection' })
    ).toBeDisabled()
  })

  test('can add a bookmark to an existing collection', async () => {
    const user = userEvent.setup()

    render(
      <ApplicationsTable
        bookmarks={exampleBookmarks}
        handleAddToCollection={mockAddToCollection}
        userCollectionOptions={exampleCollections}
      />
    )

    await user.click(
      screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
    )

    expect(
      screen.getByRole('button', { name: 'Add to My Space Open' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Example Collection' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Example Collection' }))

    expect(mockAddToCollection).toHaveBeenCalledWith(
      exampleBookmarks[0],
      collectionId
    )

    expect(
      screen.queryByRole('button', { name: 'Add to My Space Open' })
    ).not.toBeInTheDocument()
  })

  test('cannot add a bookmark to an existing collection that has 10 bookmarks', async () => {
    const user = userEvent.setup()

    render(
      <ApplicationsTable
        bookmarks={exampleBookmarks}
        handleAddToCollection={mockAddToCollection}
        userCollectionOptions={exampleCollectionsWithLimit}
      />
    )

    await user.click(
      screen.getAllByRole('button', { name: 'Add to My Space Closed' })[0]
    )

    expect(
      screen.getByRole('button', { name: 'Add to My Space Open' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Example Collection' })
    ).toBeDisabled()
  })
})
