import React from 'react'
import { Meta } from '@storybook/react'

import SelectableCollection from './SelectableCollection'

type StorybookArgTypes = {
  handleSelect: () => void
}

export default {
  title: 'Components/Collections/SelectableCollection',
  component: SelectableCollection,
  argTypes: {
    handleSelect: { action: 'Select collection' },
  },
} as Meta

const exampleCollection = {
  id: '123',
  title: 'Example Collection',
  bookmarks: [
    {
      id: '456',
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      id: '789',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      id: '102',
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
  ],
}

export const Unselected = (argTypes: StorybookArgTypes) => (
  <SelectableCollection
    {...exampleCollection}
    isSelected={false}
    onSelect={argTypes.handleSelect}
  />
)

export const Selected = (argTypes: StorybookArgTypes) => (
  <SelectableCollection
    {...exampleCollection}
    isSelected={true}
    onSelect={argTypes.handleSelect}
  />
)

export const Disabled = (argTypes: StorybookArgTypes) => (
  <SelectableCollection
    {...exampleCollection}
    isSelected={false}
    onSelect={argTypes.handleSelect}
    disabled
  />
)
