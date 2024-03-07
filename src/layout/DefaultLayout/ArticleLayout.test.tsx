/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'

import { renderWithAuthAndApollo } from '../../testHelpers'
import {
  getUserMock,
  getUserNoLoadingMock,
} from '../../__fixtures__/operations/getUser'

import ArticleLayout, { withArticleLayout } from './ArticleLayout'

describe('ArticleLayout component', () => {
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <ArticleLayout>
        <h2>Test Page</h2>
      </ArticleLayout>,
      {},
      getUserMock
    )
    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  it('renders the children', () => {
    expect(screen.getAllByText('Test Page'))
  })

  it('renders a skip nav link', () => {
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content')

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('renders common layout elements', () => {
    expect(screen.getAllByRole('banner')).toHaveLength(2) // Gov banner & site header
    expect(screen.getAllByRole('navigation')).toHaveLength(3) // header, page nav, footer
  })
})

describe('withArticleLayout HOC', () => {
  it('renders children inside of the article layout', async () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(
      withArticleLayout(<TestPage />),
      {},
      getUserNoLoadingMock
    )
    await waitFor(() => expect(screen.getByText('My page')).toBeInTheDocument())
  })
})
