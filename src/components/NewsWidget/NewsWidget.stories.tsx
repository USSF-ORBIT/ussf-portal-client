import React from 'react'
import { Meta } from '@storybook/react'

import NewsWidget from './NewsWidget'
import { mockRssFeedTwo } from '__mocks__/news-rss'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import { Widget } from 'types'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

type StorybookArgTypes = {
  widget: Widget
}

export default {
  title: 'Components/NewsWidget',
  component: NewsWidget,
  argTypes: {
    onRemove: { action: 'Remove this widget' },
  },
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
  <NewsWidget widget={argTypes.widget} />
)
