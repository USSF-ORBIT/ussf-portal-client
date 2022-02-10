import React from 'react'
import { Meta } from '@storybook/react'

import NewsWidget from './NewsWidget'

export default {
  title: 'Components/NewsWidget',
  component: NewsWidget,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const SpaceForceRSS = () => <NewsWidget />
