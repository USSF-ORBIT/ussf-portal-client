import React from 'react'
import { Meta } from '@storybook/react'
import CustomCollection from './CustomCollection'

type StorybookArgTypes = {
  handleAddBookmark: () => void
  handleRemoveBookmark: () => void
  handleRemoveCollection: () => void
  handleEditCollection: () => void
  handleEditBookmark: () => void
}

export default {
  title: 'Components/Collections/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleAddBookmark: { action: 'Add bookmark' },
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleRemoveCollection: { action: 'Remove collection' },
    handleEditCollection: { action: 'Edit collection' },
    handleEditBookmark: { action: 'Edit bookmark' },
  },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id="testCollection"
    title="Example collection"
    bookmarks={[
      { _id: 'link1', url: '#', label: 'Webmail', cmsId: 'cmsLink1' },
      { _id: 'link2', url: '#', label: 'Custom Link' },
    ]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)

export const BlankCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id="testCollection"
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)
