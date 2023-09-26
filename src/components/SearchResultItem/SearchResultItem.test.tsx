/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { SearchResultItem } from './SearchResultItem'
import type { SearchResultRecord } from 'types/index'

const testApplicationResult: SearchResultRecord = {
  id: 'testBookmark123',
  type: 'Bookmark',
  title: 'MyFSS',
  preview:
    'How is Air Force Information Management System abbreviated? AFIMS stands for Air Force Information Management System. For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective.',
  permalink: 'https://www.url.com/myfss',
}

const testArticleResult: SearchResultRecord = {
  id: 'testArticle123',
  type: 'Article',
  title:
    'Physical training: Everything you need to know about the update in requirements',
  preview:
    'As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
  permalink:
    'https://localhost:3000/articles/physical-training-everything-you-need-to-know',
  date: '2022-05-17T13:44:39.796Z',
}

describe('SearchResultItem component', () => {
  it('renders an Application result with no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(
        <SearchResultItem item={testApplicationResult} />,
        { legacyRoot: true }
      )

      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      expect(screen.queryAllByRole('link')).toHaveLength(1)
      expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
        'href',
        testApplicationResult.permalink
      )
      expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
        testApplicationResult.title
      )
      expect(
        screen.queryByText(testApplicationResult.preview)
      ).toBeInTheDocument()
      expect(screen.queryByText('Application')).toHaveClass('usa-tag')

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('renders an Article result with no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(
        <SearchResultItem item={testArticleResult} />,
        { legacyRoot: true }
      )

      expect(screen.queryByText('May')).toBeInTheDocument()
      expect(screen.queryByText('17')).toBeInTheDocument()

      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      expect(screen.queryAllByRole('link')).toHaveLength(1)
      expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
        'href',
        testArticleResult.permalink
      )
      expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
        testArticleResult.title
      )
      expect(screen.queryByText(testArticleResult.preview)).toBeInTheDocument()
      expect(screen.queryByText('USSF News')).toHaveClass('usa-tag')

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
