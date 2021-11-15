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
  title: 'Components/Collections/CustomCollection',
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
    _id="testCollection"
    title="Example collection"
    // #TODO should i change objectid to a string since client cant read it
    bookmarks={[{ _id: 'link1', url: '#', label: 'Webmail' }]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)

export const BlankCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id="testCollection"
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)
