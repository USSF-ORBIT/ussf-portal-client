import React from 'react'
import { Meta } from '@storybook/react'
import Search from './Search'

export default {
  title: 'Components/Search',
  component: Search,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultSearch = () => <Search />
