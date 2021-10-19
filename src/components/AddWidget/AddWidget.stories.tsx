import React from 'react'
import { Meta } from '@storybook/react'

import AddWidget from './AddWidget'

type StorybookArgTypes = {
  handleSelectCollection: () => void
}

export default {
  title: 'Components/AddWidget',
  component: AddWidget,
  argTypes: {
    handleSelectCollection: { action: 'Select existing collection(s)' },
  },
} as Meta

export const DefaultAddWidget = (argTypes: StorybookArgTypes) => (
  <AddWidget handleSelectCollection={argTypes.handleSelectCollection} />
)
