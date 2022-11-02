/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'

import { renderWithAuthAndApollo } from '../../testHelpers'

import PageLayout, { withPageLayout } from './PageLayout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('PageLayout component', () => {
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <PageLayout header={<h1>Test Page</h1>}>
        <h2>Test Page</h2>
      </PageLayout>
    )

    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  it('renders the header and children', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
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

describe('withPageLayout HOC', () => {
  it('renders children inside of the page layout', async () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(withPageLayout(<h1>Test Page</h1>, <TestPage />))
    await waitFor(() => expect(screen.getByText('My page')).toBeInTheDocument())
  })
})
