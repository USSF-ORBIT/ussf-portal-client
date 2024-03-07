/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { ArticleList } from './ArticleList'

const testArticle = {
  id: 'testArticleId123',
  slug: 'test-article',
  title:
    'Version 2.8.5 released! Includes MVP search experience and a way to filter the news.',
  preview:
    'This article is a test. Vestibulum in turpis vitae arcu tincidunt maximus sit amet suscipit justo. Morbi lobortis posuere mollis. Suspendisse egestas egestas sapien eu blandit. In euismod suscipit nisi, eget vulputate tellus. Cras vel nisi nec urna facilisis luctus. Phasellus vel sagittis lacus. Ut dapibus ipsum arcu, nec semper ipsum malesuada in. Aliquam et lectus pharetra, gravida eros suscipit, tincidunt libero. Fusce vel ultrices tellus, vel pulvinar diam. Vestibulum pharetra vehicula lacinia.',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

const testArticles = [testArticle, testArticle, testArticle]

describe('ArticleList component', () => {
  test('renders a list of articles', () => {
    render(<ArticleList articles={testArticles} />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('displays the Pagination component if pagination props are passed in', async () => {
    render(
      <ArticleList
        articles={testArticles}
        pagination={{ currentPage: 1, totalPages: 2 }}
      />
    )

    expect(
      screen.getByRole('navigation', { name: 'Pagination' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Page 2' })).toBeInTheDocument()
  })

  test('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<ArticleList articles={testArticles} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('renders an empty state', () => {
    render(<ArticleList articles={[]} />)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no published articles in this category.')
    ).toBeInTheDocument()
  })
})
