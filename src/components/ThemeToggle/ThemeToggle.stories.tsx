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

export const WhenOn: StoryObj = {
  parameters: {
    launchdarkly: {
      flags: {
        darkModeToggle: true,
      },
    },
  },
}

export const WhenOff: StoryObj = {
  parameters: {
    launchdarkly: {
      flags: {
        darkModeToggle: false,
      },
    },
  },
}
