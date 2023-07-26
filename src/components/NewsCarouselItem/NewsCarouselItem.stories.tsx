import React from 'react'
import { Meta } from '@storybook/react'
import NewsCarouselItem from './NewsCarouselItem'
import type { ArticleListItemRecord } from 'types'

export default {
  title: 'Components/NewsCarousel/NewsCarouselItem',
  component: NewsCarouselItem,
} as Meta

const mockArticle: ArticleListItemRecord = {
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
}

export const DefaultNewsCarouselItem = () => (
  <NewsCarouselItem article={mockArticle} />
)

const articleWithHero = {
  ...mockArticle,
  hero: { url: '/assets/images/hero.jpeg' },
}
export const NewsCarouselItemWithHero = () => (
  <NewsCarouselItem article={articleWithHero} />
)
