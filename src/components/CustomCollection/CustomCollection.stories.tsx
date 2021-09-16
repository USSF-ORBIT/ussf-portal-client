import React from 'react'
import { Meta } from '@storybook/react'
import CustomCollection from './CustomCollection'

export default {
  title: 'Components/CustomCollection',
  component: CustomCollection,
} as Meta

export const ExampleCustomCollection = () => (
  <CustomCollection
    title="Example collection"
    bookmarks={[{ id: 'link1', url: '#', label: 'Webmail' }]}
  />
)
