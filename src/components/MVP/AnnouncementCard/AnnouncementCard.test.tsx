/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import type { AnnouncementCardProps } from './AnnouncementCard'
import AnnouncementCard from './AnnouncementCard'

describe('Announcement Card component', () => {
  describe('News Announcement', () => {
    beforeEach(() => {
      const news: AnnouncementCardProps = {
        heading: 'News Item',
        body: 'Lorem ipsum',
        tag: 'news',
        bgColor: 'gradient--orange bg-accent-warm-dark',
        cols: true,
        path: '/news',
      }

      render(<AnnouncementCard {...news} />)
    })
    it('renders the heading', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('News Item')
    })
    it('renders the link', () => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/news')
    })

    it('renders the tag', () => {
      expect(screen.getByText('news')).toHaveClass('tag--news')
    })
    it('renders the card body', () => {
      expect(screen.getByTestId('CardBody')).toBeInstanceOf(HTMLDivElement)
      expect(screen.getByText('Lorem ipsum')).toBeInstanceOf(
        HTMLParagraphElement
      )
    })
  })
})
