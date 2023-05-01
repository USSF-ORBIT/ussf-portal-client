import React from 'react'
import { Meta } from '@storybook/react'

import AddWidget from './AddWidget'

type StorybookArgTypes = {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
  handleAddNews: () => void
  handleAddGuardianIdeal: () => void
  handleAddFeaturedShortcuts: () => void
}

export default {
  title: 'Base/AddWidget',
  component: AddWidget,
  argTypes: {
    handleSelectCollection: { action: 'Select collection from template' },
    handleCreateCollection: { action: 'Create new collection' },
    handleAddNews: { action: 'Add news widget' },
    handleAddGuardianIdeal: { action: 'Add Guardian Ideal widget' },
    handleAddFeaturedShortcuts: { action: 'Add Featured Shortcuts' },
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
    handleAddGuardianIdeal={argTypes.handleAddGuardianIdeal}
    handleAddFeaturedShortcuts={argTypes.handleAddFeaturedShortcuts}
  />
)

export const AddCollectionDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    handleAddGuardianIdeal={argTypes.handleAddGuardianIdeal}
    handleAddFeaturedShortcuts={argTypes.handleAddFeaturedShortcuts}
    canAddCollection={false}
  />
)

export const NewsWidgetDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    handleAddGuardianIdeal={argTypes.handleAddGuardianIdeal}
    handleAddFeaturedShortcuts={argTypes.handleAddFeaturedShortcuts}
    canAddNews={false}
  />
)
