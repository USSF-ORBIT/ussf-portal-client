import React from 'react'
import { Meta } from '@storybook/react'
import BookmarkList from './BookmarkList'
import type { Bookmark } from 'types/index'

export default {
  title: 'Components/BookmarkList',
  component: BookmarkList,
} as Meta

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

export const ExampleBookmarkList = () => (
  <BookmarkList bookmarks={exampleBookmarks} />
)
