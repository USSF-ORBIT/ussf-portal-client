/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import NewsItem from './NewsItem'

const testArticle = {
  id: 'testArticle123',
  title: 'Test Article Headline',
  sourceLink: 'http://www.example.com',
  description: 'This is a test article',
  publishDate: 'Tues, 08 Feb 2022 05:00:00 GMT',
  thumbnailSrc: 'https://via.placeholder.com/150',
  sourceName: 'Example.com',
  source: 'RSS',
}

describe('NewsItem component', () => {
  describe('displayed in a widget', () => {
    beforeEach(() => {
      render(<NewsItem article={testArticle} widget={true} />)
    })

    test('renders the article contents', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        testArticle.title
      )
      expect(
        screen.getByText(`${testArticle.publishDate} //`)
      ).toBeInTheDocument()

      expect(screen.getByText(/This is a test article/i)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()

      expect(
        screen.getByRole('link', {
          name: `${testArticle.publishDate} // ${testArticle.title}`,
        })
      ).toHaveAttribute('href', testArticle.sourceLink)

      expect(screen.getByRole('article')).toHaveClass('NewsItem')
      expect(screen.getByRole('article')).toHaveClass('newsWidgetItem')
    })
  })

  describe('displayed not in a widget', () => {
    // The above tests covers the basiscs, this just ensures that if widget is false
    // the class is appropriately rendered.
    test('renders the article contents', () => {
      render(<NewsItem article={testArticle} />)

      expect(screen.getByRole('article')).toHaveClass('NewsItem')
      expect(screen.getByRole('article')).not.toHaveClass('newsWidgetItem')
    })
  })
})
