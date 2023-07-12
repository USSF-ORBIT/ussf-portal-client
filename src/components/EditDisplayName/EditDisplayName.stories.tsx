import React from 'react'
import type { Meta } from '@storybook/react'
import EditDisplayName from './EditDisplayName'

type StorybookArgTypes = {
  handleEditDisplayName: () => void
}

export default {
  title: 'Components/EditDisplayName',
} as Meta

export const DefaultEditDisplayName = (argTypes: StorybookArgTypes) => (
  <EditDisplayName
    userDisplayName="Test Name"
    handleEditDisplayName={argTypes.handleEditDisplayName}
  />
)
