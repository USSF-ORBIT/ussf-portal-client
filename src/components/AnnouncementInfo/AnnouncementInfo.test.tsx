/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import AnnouncementInfo from './AnnouncementInfo'
import {
  testAnnouncementWithArticle,
  testAnnouncementWithArticleNoSlug,
  testAnnouncementWithUrl,
} from '__fixtures__/data/cmsAnnouncments'

describe('AnnouncementInfo component', () => {
  it('renders an announcement with a url CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithUrl} />)

    expect(screen.getAllByText('Test Announcement')).toHaveLength(1)
    expect(screen.getAllByText('View more')).toHaveLength(1)
  })

  it('renders an announcement with a default url if none is provided', () => {
    render(
      <AnnouncementInfo announcement={testAnnouncementWithArticleNoSlug} />
    )
    expect(screen.getAllByText('Cool new article')).toHaveLength(1)

    const link = screen.getByRole('link', { name: 'View article' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders an announcement with an article CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithArticle} />)

    expect(screen.getAllByText('Cool new article')).toHaveLength(1)
    expect(screen.getAllByText('View article')).toHaveLength(1)
  })
})
