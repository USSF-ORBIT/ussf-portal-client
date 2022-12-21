import React from 'react'
import { Meta } from '@storybook/react'

import AddWidget from './AddWidget'

type StorybookArgTypes = {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
  handleAddNews: () => void
}

export default {
  title: 'Base/AddWidget',
  component: AddWidget,
  argTypes: {
    handleSelectCollection: { action: 'Select collection from template' },
    handleCreateCollection: { action: 'Create new collection' },
    handleAddNews: { action: 'Add news section' },
  },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultAddWidget = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
  />
)

export const AddCollectionDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    canAddCollection={false}
  />
)

export const NewsSectionDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    canAddNews={false}
  />
)
