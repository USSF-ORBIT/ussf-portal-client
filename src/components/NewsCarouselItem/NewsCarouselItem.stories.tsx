import React from 'react'
import { Meta } from '@storybook/react'
import NewsCarouselItem from './NewsCarouselItem'
import type { ArticleListItemRecord } from 'types'

export default {
  title: 'Components/NewsCarouselItem',
  component: NewsCarouselItem,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const mockArticle: ArticleListItemRecord = {
  id: '2',
  title: 'Another Thing? Wow!',
  labels: [
    {
      id: 'label2',
      name: 'Super Cool Label',
      type: 'Audience',
    },
  ],
  publishedDate: 'Aug 03, 2022',
  preview:
    'Please, Don-Bot… look into your hard drive, and open your mercy file!',
}

export const DefaultNewsCarouselItem = () => (
  <NewsCarouselItem article={mockArticle} />
)
