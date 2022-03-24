/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import DefaultLayout, { withDefaultLayout } from './DefaultLayout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('DefaultLayout component', () => {
  beforeEach(() => {
    render(
      <DefaultLayout>
        <h1>Test Page</h1>
      </DefaultLayout>
    )
  })

  it('renders its children', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders a skip nav link', () => {
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content')

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('renders a feedback link', () => {
    expect(
      screen.getByRole('link', { name: 'Send us feedback' })
    ).toHaveAttribute(
      'href',
      'mailto:feedback@ussforbit.us?subject=USSF portal feedback'
    )
  })

  it('renders common layout elements', () => {
    expect(screen.getAllByRole('banner')).toHaveLength(2) // Gov banner & site header
    expect(screen.getAllByRole('navigation')).toHaveLength(3) // header, page nav, footer
  })
})

describe('withDefaultLayout HOC', () => {
  it('renders children inside of the default layout', () => {
    const TestPage = () => <div>My page</div>
    render(withDefaultLayout(<TestPage />))
    expect(screen.getByText('My page')).toBeInTheDocument()
  })
})
