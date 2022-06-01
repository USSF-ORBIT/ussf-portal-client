/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import ArticleLayout, { withArticleLayout } from './ArticleLayout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('ArticleLayout component', () => {
  beforeEach(() => {
    render(
      <ArticleLayout>
        <h2>Test Page</h2>
      </ArticleLayout>
    )
  })

  it('renders the children', () => {
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders a skip nav link', () => {
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content')

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('renders common layout elements', () => {
    expect(screen.getAllByRole('banner')).toHaveLength(2) // Gov banner & site header
    expect(screen.getAllByRole('navigation')).toHaveLength(2) // header, page nav, footer
  })
})

describe('withArticleLayout HOC', () => {
  it('renders children inside of the article layout', () => {
    const TestPage = () => <div>My page</div>
    render(withArticleLayout(<TestPage />))
    expect(screen.getByText('My page')).toBeInTheDocument()
  })
})
