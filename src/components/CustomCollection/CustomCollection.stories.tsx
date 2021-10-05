import React from 'react'
import { Meta } from '@storybook/react'
import CustomCollection from './CustomCollection'

type StorybookArgTypes = {
  handleRemoveBookmark: () => void
  handleAddBookmark: () => void
}

export default {
  title: 'Components/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleAddBookmark: { action: 'Add bookmark' },
  },
} as Meta

export const ExampleCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    title="Example collection"
    bookmarks={[{ id: 'link1', url: '#', label: 'Webmail' }]}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleAddBookmark={argTypes.handleAddBookmark}
  />
)
