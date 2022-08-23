/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import NewsCarouselItem from './NewsCarouselItem'

const mockArticle = {
  __typename: 'Article',
  id: 'id1',
  slug: 'announcing-the-dev-blog',
  title: 'Announcing the dev blog',
  preview: 'This is the preview text!',
  publishedDate: '2022-05-18T17:18:40.802Z',
  labels: [],
}

describe('NewsCarouselItem component', () => {
  it('renders the component with a mock article', () => {
    render(<NewsCarouselItem article={mockArticle} />)
    expect(screen.getAllByText('Announcing the dev blog')).toHaveLength(1)
    expect(screen.getAllByText('This is the preview text!')).toHaveLength(1)
  })
})
