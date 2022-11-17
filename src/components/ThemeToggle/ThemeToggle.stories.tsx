import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import ThemeToggle from './ThemeToggle'

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const Example: StoryObj = {}
