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
  publishDate: 'Tues, 08 Feb 2022 05:00:00 GMT',
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
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        testArticle.title
      )
      expect(screen.getByText('08 FEB 2022')).toBeInTheDocument()

      expect(screen.getAllByRole('img')[0]).toHaveAttribute(
        'src',
        testArticle.thumbnailSrc
      )

      expect(
        screen.getByRole('link', {
          name: `${testArticle.title}`,
        })
      ).toHaveAttribute('href', testArticle.sourceLink)

      expect(screen.getByText(/This is a test article/i)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })

  describe('with no image', () => {
    beforeEach(() => {
      render(<NewsListItem article={testArticleNoImage} />)
    })

    it('renders the article contents with no image', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        testArticle.title
      )
      expect(screen.getByText('08 FEB 2022')).toBeInTheDocument()

      expect(screen.queryByRole('img')).toBeInTheDocument()

      expect(
        screen.queryByRole('link', {
          name: `${testArticle.title}`,
        })
      ).not.toBeInTheDocument()

      expect(screen.getByText(/This is a test article/i)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })

  describe('displayed in a widget', () => {
    beforeEach(() => {
      render(<NewsListItem article={testArticle} widget={true} />)
    })

    it('renders the article contents', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        testArticle.title
      )
      expect(screen.getByText('08 FEB 2022')).toBeInTheDocument()

      expect(screen.queryByRole('img')).toBeInTheDocument()

      expect(screen.getByText(/This is a test article/i)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })
})
