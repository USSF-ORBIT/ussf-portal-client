import React from 'react'
import { Meta } from '@storybook/react'
import NewsCarousel from './NewsCarousel'
import { ArticleListItemRecord } from 'types'

export default {
  title: 'Components/NewsCarousel',
  component: NewsCarousel,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const mockArticles: ArticleListItemRecord[] = [
  {
    id: '1',
    title: 'My Thing!',
    labels: [
      {
        id: 'label1',
        name: 'A Label',
        type: 'Source',
      },
    ],
    publishedDate: 'Aug 03, 2022',
    preview: "It's a thing",
  },
  {
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
  },
]

export const DefaultNewsCarousel = () => (
  <NewsCarousel articles={mockArticles} />
)
