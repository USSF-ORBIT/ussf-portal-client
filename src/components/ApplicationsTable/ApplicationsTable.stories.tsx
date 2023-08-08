import React from 'react'
import { Meta } from '@storybook/react'
import ApplicationsTable from './ApplicationsTable'
import type { CMSBookmark } from 'types/index'

type StorybookArgTypes = {
  handleAddToCollection: () => void
}

export default {
  title: 'Components/ApplicationsTable',
  component: ApplicationsTable,
  argTypes: {
    handleAddToCollection: { action: 'Add to collection' },
  },
} as Meta

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

export const ExampleApplicationsTable = (argTypes: StorybookArgTypes) => (
  <ApplicationsTable
    bookmarks={exampleBookmarks}
    handleAddToCollection={argTypes.handleAddToCollection}
  />
)
