import React from 'react'
import type { Meta } from '@storybook/react'

import NewsListItem from './NewsListItem'

export default {
  title: 'Components/NewsListItem',
  component: NewsListItem,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const mockRSSArticle = {
  title: 'DAF COVID-19 Statistics - Feb. 8, 2022',
  sourceLink:
    'https://www.spaceforce.mil/News/Article/2903050/daf-covid-19-statistics-feb-8-2022/',
  description: `Below are current Coronavirus Disease 2019 statistics for Department of the Air Force personnel:`,
  publishDate: '08 Feb 2022',
  thumbnailSrc:
    'https://media.defense.gov/2021/Dec/07/2002921422/670/394/0/211207-F-GO452-0001.JPG',
  source: 'RSS',
  sourceName: 'SPACEFORCE.mil',
}

export const RSSArticle = () => <NewsListItem article={mockRSSArticle} />
