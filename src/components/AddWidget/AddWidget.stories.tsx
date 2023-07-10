import React from 'react'
import { Meta } from '@storybook/react'
import { MySpaceContext, MySpaceContextType } from '../../stores/myspaceContext'
import AddWidget from './AddWidget'

type StorybookArgTypes = {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
}

const mockMySpaceContext: MySpaceContextType = {
  mySpace: [],
  disableDragAndDrop: false,
  setDisableDragAndDrop: () => {
    return
  },
  initializeMySpace: () => {
    return
  },
  isCollection: () => {
    return true || false
  },
  isGuardianIdeal: () => {
    return true || false
  },
  isNewsWidget: () => {
    return true || false
  },
  isFeaturedShortcuts: () => {
    return true || false
  },
  canAddCollections: true,
  canAddNews: true,
  canAddGuardianIdeal: true,
  canAddFeaturedShortcuts: true,
  addNewsWidget: () => {
    return
  },
  addGuardianIdeal: () => {
    return
  },
  addFeaturedShortcuts: () => {
    return
  },
  addNewCollection: () => {
    return
  },
  handleOnDragEnd: () => {
    return
  },
}

const MockContextProvider = ({
  children,
  mockValue,
}: {
  children: React.ReactNode
  mockValue: MySpaceContextType
}) => {
  return (
    <MySpaceContext.Provider value={mockValue}>
      {children}
    </MySpaceContext.Provider>
  )
}

export default {
  title: 'Base/AddWidget',
  component: AddWidget,
  argTypes: {
    handleSelectCollection: { action: 'Select collection from template' },
    handleCreateCollection: { action: 'Create new collection' },
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
  />
)

export const AddCollectionDisabled = (argTypes: StorybookArgTypes) => (
  <MockContextProvider
    mockValue={{
      ...mockMySpaceContext,
      canAddCollections: false,
    }}>
    <AddWidget
      handleSelectCollection={argTypes.handleSelectCollection}
      handleCreateCollection={argTypes.handleCreateCollection}
    />
  </MockContextProvider>
)

export const NewsWidgetDisabled = (argTypes: StorybookArgTypes) => (
  <MockContextProvider
    mockValue={{
      ...mockMySpaceContext,
      canAddNews: false,
    }}>
    <AddWidget
      handleSelectCollection={argTypes.handleSelectCollection}
      handleCreateCollection={argTypes.handleCreateCollection}
    />
  </MockContextProvider>
)
