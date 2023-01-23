import React from 'react'
import { Meta } from '@storybook/react'
import Search from './Search'

export default {
  title: 'Base/Search',
  component: Search,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Enabled = () => <Search />
