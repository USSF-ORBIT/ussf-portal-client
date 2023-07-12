import React from 'react'
import type { Meta } from '@storybook/react'

import NewsItem from './NewsItem'

export default {
  title: 'Components/NewsWidget/NewsItem',
  component: NewsItem,
} as Meta

const mockRSSArticle = {
  id: 'testArticle',
  title: 'Newest missile warning satellite accepted for operations',
  sourceLink:
    'https://www.spaceforce.mil/News/Article/2903050/daf-covid-19-statistics-feb-8-2022/',
  description: `Space Operations Command has accepted Space Based Geosynchronous Infrared Satellite 5 as operationally capable and has presented it to United States Space Command for operational use.`,
  publishDate: 'Feb 04, 2022',
  thumbnailSrc:
    'https://media.defense.gov/2021/Dec/07/2002921422/670/394/0/211207-F-GO452-0001.JPG',
  source: 'RSS',
  sourceName: 'SPACEFORCE.mil',
}

export const RSSArticle = () => <NewsItem article={mockRSSArticle} />

export const RSSArticleNoImage = () => (
  <NewsItem article={{ ...mockRSSArticle, thumbnailSrc: '' }} />
)

export const RSSArticleWidget = () => (
  <NewsItem article={mockRSSArticle} widget={true} />
)
