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

describe('NewsListItem component', () => {
  describe('displayed in a widget', () => {
    beforeEach(() => {
      render(<NewsListItem article={testArticle} widget={true} />)
    })

    it('renders the article contents', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        testArticle.title
      )

      expect(screen.getByText(/This is a test article/i)).toBeInTheDocument()
      expect(screen.getByText(testArticle.sourceName)).toBeInTheDocument()
    })
  })
})
