import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'mongodb'

import SelectableCollection from './SelectableCollection'

type StorybookArgTypes = {
  handleSelect: () => void
}

export default {
  title: 'Components/Sections/Collections/SelectableCollection',
  component: SelectableCollection,
  argTypes: {
    handleSelect: { action: 'Select collection' },
  },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const exampleCollection = {
  id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      id: ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      id: ObjectId(),
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
