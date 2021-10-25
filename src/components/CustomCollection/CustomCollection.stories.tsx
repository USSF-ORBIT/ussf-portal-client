import React from 'react'
import { Meta } from '@storybook/react'
import CustomCollection from './CustomCollection'

type StorybookArgTypes = {
  handleAddBookmark: () => void
  handleRemoveBookmark: () => void
  handleRemoveCollection: () => void
  handleEditCollection: () => void
}

export default {
  title: 'Components/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleAddBookmark: { action: 'Add bookmark' },
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleRemoveCollection: { action: 'Remove collection' },
    handleEditCollection: { action: 'Edit collection' },
  },
} as Meta

export const ExampleCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    id="testCollection"
    title="Example collection"
    bookmarks={[{ id: 'link1', url: '#', label: 'Webmail' }]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)

export const BlankCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    id="testCollection"
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)
