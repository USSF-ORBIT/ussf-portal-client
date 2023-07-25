import React from 'react'
import { Meta } from '@storybook/react'
import NewsCarousel from './NewsCarousel'
import { ArticleListItemRecord } from 'types'

export default {
  title: 'Components/NewsCarousel',
  component: NewsCarousel,
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
    hero: { url: '/assets/images/hero.jpeg' },
  },
  {
    id: '2',
    title: 'Next USSF town hall happening 1 MAY 2022, at 1300 GMT',
    labels: [
      {
        id: 'label2',
        name: 'Super Cool Label',
        type: 'Audience',
      },
    ],
    publishedDate: 'Aug 03, 2022',
    preview:
      'The second Inspector General Independent Racial Disparity Review focused on gender and ethnicity, and included additional racial groups (Hispanics, Latinos, Asians, American Indians, Alaska Natives, Native Hawaiians and other Pacific Islanders). It also referenced and compared data from the prior report on racial disparity, involving Black/African American Airmen and Guardians.',
  },
]

export const DefaultNewsCarousel = () => (
  <NewsCarousel articles={mockArticles} />
)
