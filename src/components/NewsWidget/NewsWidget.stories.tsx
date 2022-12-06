import React from 'react'
import { Meta } from '@storybook/react'

import NewsWidget from './NewsWidget'
import { mockRssFeedTwo } from '__mocks__/news-rss'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

type StorybookArgTypes = {
  onRemove: () => void
}

export default {
  title: 'Components/News',
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
