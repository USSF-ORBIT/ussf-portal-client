import React from 'react'
import { Meta } from '@storybook/react'

import NewsSection from './NewsSection'

type StorybookArgTypes = {
  onRemove: () => void
}

export default {
  title: 'Components/Sections/News',
  component: NewsSection,
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
  <NewsSection onRemove={argTypes.onRemove} />
)
