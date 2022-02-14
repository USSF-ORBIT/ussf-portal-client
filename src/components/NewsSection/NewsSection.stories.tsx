import React from 'react'
import { Meta } from '@storybook/react'

import NewsSection from './NewsSection'

export default {
  title: 'Components/Sections/NewsSection',
  component: NewsSection,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const SpaceForceRSS = () => <NewsSection />
