import React from 'react'
import { Meta } from '@storybook/react'

import NewsSection from './NewsSection'

type StorybookArgTypes = {
  onRemoveSection: () => void
}

export default {
  title: 'Components/Sections/NewsSection',
  component: NewsSection,
  argTypes: {
    onRemoveSection: { action: 'Remove this section' },
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
  <NewsSection onRemoveSection={argTypes.onRemoveSection} />
)
