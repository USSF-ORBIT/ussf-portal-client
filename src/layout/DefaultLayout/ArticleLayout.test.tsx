/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

import { mockUseTheme, renderWithAuthAndApollo } from '../../testHelpers'
import { getThemeMock } from '../../__fixtures__/operations/getTheme'
import { editThemeMock } from '../../__fixtures__/operations/editTheme'

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
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <ArticleLayout>
        <h2>Test Page</h2>
      </ArticleLayout>,
      {},
      getThemeMock
    )
    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
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

describe('calls hooks as needed', () => {
  const { setItemMock } = mockUseTheme()

  beforeEach(async () => {
    renderWithAuthAndApollo(
      <ThemeProvider enableSystem={false}>
        <ArticleLayout>
          <h1>Test Page</h1>
        </ArticleLayout>
      </ThemeProvider>,
      {},
      [...getThemeMock, ...editThemeMock]
    )
    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  it('uses useGetThemeQuery', () => {
    expect(getThemeMock[0].result).toHaveBeenCalled()
  })

  it('uses setTheme', async () => {
    await waitFor(() => expect(setItemMock).toHaveBeenCalled())
  })
})

describe('ArticleLayout component before theme query is finished', () => {
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <ArticleLayout>
        <h1>Test Page</h1>
      </ArticleLayout>
    )
  })
  it('does not show anything', () => {
    expect(screen.queryByText('Test Page')).not.toBeInTheDocument()
  })
})

describe('withArticleLayout HOC', () => {
  it('renders children inside of the article layout', () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(withArticleLayout(<TestPage />), {}, getThemeMock)
    waitFor(() => expect(screen.getByText('My page')).toBeInTheDocument())
  })
})
