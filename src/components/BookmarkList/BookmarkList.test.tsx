/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import BookmarkList from './BookmarkList'
import type { Bookmark } from 'types'

const exampleBookmarks: Bookmark[] = [
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

describe('BookmarkList component', () => {
  it('renders a list of bookmark links', () => {
    render(<BookmarkList bookmarks={exampleBookmarks} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(7)
  })

  it('doesn’t render invalid bookmarks', () => {
    render(<BookmarkList bookmarks={exampleInvalidBookmarks} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(4)
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(
        <BookmarkList bookmarks={exampleBookmarks} />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
