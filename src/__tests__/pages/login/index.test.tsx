/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import Login from 'pages/login/index'

describe('Login page', () => {
  beforeEach(() => {
    render(<Login />)
  })

  it('renders the page title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Space Force Portal Login'
    )
  })

  it('renders the accordion title', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Contact the Help Desk'
    )
  })

  it('renders the notice', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Notice'
    )
  })

  it('renders the login button', () => {
    expect(screen.getByRole('link')).toHaveTextContent('Login')
  })
})
