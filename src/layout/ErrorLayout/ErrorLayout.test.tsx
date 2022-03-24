/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import ErrorLayout, { withErrorLayout } from './ErrorLayout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('ErrorLayout component', () => {
  describe('default props', () => {
    beforeEach(() => {
      render(
        <ErrorLayout>
          <h2>Test Page</h2>
        </ErrorLayout>
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
      expect(screen.getAllByRole('navigation')).toHaveLength(2) // header, footer
    })
  })

  describe('if hideNav is true', () => {
    beforeEach(() => {
      render(
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
    render(withErrorLayout(<TestPage />))
    expect(screen.getByText('My page')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation')).toHaveLength(2) // header, footer
  })

  it('renders children inside of the error layout with no header nav', () => {
    const TestPage = () => <div>My page</div>
    render(withErrorLayout(<TestPage />, true))
    expect(screen.getByText('My page')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation')).toHaveLength(1) // footer
  })
})
