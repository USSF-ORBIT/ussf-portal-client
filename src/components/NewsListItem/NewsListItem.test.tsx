/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import NewsListItem from './NewsListItem'

const testArticle = {
  id: 'testArticle123',
  title: 'Test Article Headline',
  sourceLink: 'http://www.example.com',
  description: 'This is a test article',
  publishDate: 'Feb 08, 2022',
  thumbnailSrc: 'https://via.placeholder.com/150',
  sourceName: 'Example.com',
  source: 'RSS',
}

const testArticleNoImage = {
  ...testArticle,
  thumbnailSrc: '',
}

describe('NewsListItem component', () => {
  describe('with a complete article', () => {
    beforeEach(() => {
      render(<NewsListItem article={testArticle} />)
    })

    it('renders the article contents', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        testArticle.title
      )
      expect(
        screen.getByText(`${testArticle.publishDate} //`)
      ).toBeInTheDocument()

      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        testArticle.thumbnailSrc
      )

      expect(
        screen.getByRole('link', {
          name: `${testArticle.title}`,
        })
      ).toHaveAttribute('href', testArticle.sourceLink)

      expect(
        screen.getByRole('link', {
          name: `${testArticle.publishDate} // ${testArticle.title}`,
        })
      ).toHaveAttribute('href', testArticle.sourceLink)

      expect(screen.getByText(testArticle.description)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })

  describe('with no image', () => {
    beforeEach(() => {
      render(<NewsListItem article={testArticleNoImage} />)
    })

    it('renders the article contents with no image', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        testArticle.title
      )
      expect(
        screen.getByText(`${testArticle.publishDate} //`)
      ).toBeInTheDocument()

      expect(screen.queryByRole('img')).not.toBeInTheDocument()

      expect(
        screen.queryByRole('link', {
          name: `${testArticle.title}`,
        })
      ).not.toBeInTheDocument()

      expect(
        screen.getByRole('link', {
          name: `${testArticle.publishDate} // ${testArticle.title}`,
        })
      ).toHaveAttribute('href', testArticle.sourceLink)

      expect(screen.getByText(testArticle.description)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })
})
