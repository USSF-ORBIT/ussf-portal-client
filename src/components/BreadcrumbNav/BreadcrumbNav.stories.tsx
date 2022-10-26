import React from 'react'
import type { Meta } from '@storybook/react'

import BreadcrumbNav from './BreadcrumbNav'
import { background } from '@storybook/theming'

export default {
  title: 'Components/BreadcrumbNav',
  component: BreadcrumbNav,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const NewsAndAnnouncements = () => (
  <BreadcrumbNav
    navItems={[
      { path: '/', label: 'Service portal home' },
      {
        path: '/news-announcements',
        label: 'News & Announcements',
        current: true,
      },
    ]}
  />
)

export const SearchResults = () => (
  <BreadcrumbNav
    navItems={[
      { path: '/', label: 'Service portal home' },
      { path: '/search', label: 'Search' },
      { path: '#', label: '“PT Test”', current: true },
    ]}
  />
)
