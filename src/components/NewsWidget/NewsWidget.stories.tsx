import React from 'react'
import { Meta } from '@storybook/react'

import { mockRssFeedTwo } from '__mocks__/news-rss'
import NewsWidget, { RSS_URL } from './NewsWidget'

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
  parameters: {
    mockData: [
      {
        url: RSS_URL,
        method: 'GET',
        status: 200,
        response: () => {
          return mockRssFeedTwo
        },
      },
    ],
  },
} as Meta

export const SpaceForceRSS = (argTypes: StorybookArgTypes) => (
  <NewsWidget onRemove={argTypes.onRemove} />
)
