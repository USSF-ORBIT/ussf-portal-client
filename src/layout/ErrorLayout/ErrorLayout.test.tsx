/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'

import { renderWithAuthAndApollo } from '../../testHelpers'
import ErrorLayout, { withErrorLayout } from './ErrorLayout'

describe('ErrorLayout component', () => {
  describe('default props', () => {
    beforeEach(async () => {
      renderWithAuthAndApollo(
        <ErrorLayout>
          <h2>Test Page</h2>
        </ErrorLayout>
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
      expect(screen.getAllByRole('navigation')).toHaveLength(1) // header, footer
    })
  })

  describe('if hideNav is true', () => {
    beforeEach(() => {
      renderWithAuthAndApollo(
        <ErrorLayout hideNav={true}>
          <h2>Test Page</h2>
        </ErrorLayout>
      )
    })

    it('renders the header without navigation', () => {
      expect(screen.getAllByRole('navigation')).toHaveLength(1) // footer
    })
  })
})

describe('withErrorLayout HOC', () => {
  it('renders children inside of the error layout', () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(withErrorLayout(<TestPage />))
    expect(screen.getByText('My page')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation')).toHaveLength(2) // header, footer
  })

  it('renders children inside of the error layout with no header nav', () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(withErrorLayout(<TestPage />, true))
    expect(screen.getByText('My page')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation')).toHaveLength(1) // footer
  })
})
