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
  hero: {
    url: 'http://cms.example.com/images/image.png',
  },
}

describe('NewsCarouselItem component', () => {
  test('renders the component with a mock article', () => {
    render(<NewsCarouselItem article={mockArticle} />)
    expect(screen.getAllByText('Announcing the dev blog')).toHaveLength(1)
    expect(screen.getAllByText('This is the preview text!')).toHaveLength(1)
  })

  test("renders the article's hero image", () => {
    render(<NewsCarouselItem article={mockArticle} />)

    // should have no USSF logo
    const logo = screen.queryByRole('img', {
      name: 'USSF logo',
    })
    expect(logo).not.toBeInTheDocument()

    // expect the hero image to be there
    const img = screen.getByRole('img', { name: 'article hero graphic' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src')
    expect(img.getAttribute('src')).toEqual(
      'http://cms.example.com/images/image.png'
    )
    expect(img).toHaveClass('hero')
  })

  test('does not render an img tag if article has no hero url', () => {
    const mockWithNoHero = { ...mockArticle, hero: undefined }
    render(<NewsCarouselItem article={mockWithNoHero} />)

    const img = screen.queryByRole('img', {
      name: 'article hero graphic',
    })
    expect(img).not.toBeInTheDocument()

    // expect the default space force logo
    const logo = screen.getByRole('img', {
      name: 'USSF logo',
    })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src')
    expect(logo.getAttribute('src')).toEqual(
      '/assets/images/Seal_of_the_United_States_Space_Force.svg'
    )
    expect(logo).toHaveClass('ussfLogo')
  })
})
