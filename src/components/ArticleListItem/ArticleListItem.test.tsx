/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { ArticleListItem } from './ArticleListItem'

const testArticle = {
  id: 'testArticleId123',
  slug: 'test-article',
  title:
    'Version 2.8.5 released! Includes MVP search experience and a way to filter the news.',
  preview:
    'This article is a test. Vestibulum in turpis vitae arcu tincidunt maximus sit amet suscipit justo. Morbi lobortis posuere mollis. Suspendisse egestas egestas sapien eu blandit. In euismod suscipit nisi, eget vulputate tellus. Cras vel nisi nec urna facilisis luctus. Phasellus vel sagittis lacus. Ut dapibus ipsum arcu, nec semper ipsum malesuada in. Aliquam et lectus pharetra, gravida eros suscipit, tincidunt libero. Fusce vel ultrices tellus, vel pulvinar diam. Vestibulum pharetra vehicula lacinia.',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

describe('ArticleListItem component', () => {
  it('renders the article preview', () => {
    render(<ArticleListItem article={testArticle} />)

    expect(screen.getByText('May')).toBeInTheDocument()
    expect(screen.getByText('17')).toBeInTheDocument()

    expect(screen.getAllByText(testArticle.title)).toHaveLength(1)
    expect(screen.getByTestId('article-slug')).toHaveAttribute(
      'href',
      `/articles/${testArticle.slug}`
    )
    expect(screen.getByText(testArticle.preview)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<ArticleListItem article={testArticle} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
