import React from 'react'
import { Meta } from '@storybook/react'

import AddWidget from './AddWidget'

type StorybookArgTypes = {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
  handleAddNews: () => void
  handleAddGuardianIdeal: () => void
}

export default {
  title: 'Base/AddWidget',
  component: AddWidget,
  argTypes: {
    handleSelectCollection: { action: 'Select collection from template' },
    handleCreateCollection: { action: 'Create new collection' },
    handleAddNews: { action: 'Add news section' },
    handleAddGuardianIdeal: { action: 'Add Guardian Ideal section' },
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
  />
)

export const AddCollectionDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    handleAddGuardianIdeal={argTypes.handleAddGuardianIdeal}
    canAddCollection={false}
  />
)

export const NewsSectionDisabled = (argTypes: StorybookArgTypes) => (
  <AddWidget
    handleSelectCollection={argTypes.handleSelectCollection}
    handleCreateCollection={argTypes.handleCreateCollection}
    handleAddNews={argTypes.handleAddNews}
    handleAddGuardianIdeal={argTypes.handleAddGuardianIdeal}
    canAddNews={false}
  />
)
