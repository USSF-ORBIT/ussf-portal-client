import React from 'react'
import { Meta } from '@storybook/react'

import NewsWidget from './NewsWidget'

type StorybookArgTypes = {
  onRemove: () => void
}

export default {
  title: 'Components/Sections/News',
  component: NewsWidget,
  argTypes: {
    onRemove: { action: 'Remove this section' },
  },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const SpaceForceRSS = (argTypes: StorybookArgTypes) => (
  <NewsWidget onRemove={argTypes.onRemove} />
)
