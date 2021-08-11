/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import LoginLayout from './LoginLayout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('LoginLayout component', () => {
  beforeEach(() => {
    render(
      <LoginLayout>
        <h1>Login Page</h1>
      </LoginLayout>
    )
  })

  it('renders its children', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders a skip nav link', () => {
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content')
  })
})
