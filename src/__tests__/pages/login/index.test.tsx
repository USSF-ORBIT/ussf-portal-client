/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from 'pages/login/index'
import LoginLayout from 'layout/MVP/LoginLayout/LoginLayout'

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
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Contact the Help Desk'
    )
  })

  it('renders the accordion item as hidden on page load', () => {
    expect(screen.getByTestId('accordionItem_a1')).not.toBeVisible()
  })

  it('renders the open accordion on click', () => {
    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(screen.getByTestId('accordionItem_a1')).toBeVisible()
  })

  it('renders the notice', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Notice'
    )
  })

  it('renders the login button', () => {
    expect(screen.getByRole('link')).toHaveTextContent('Login')
  })

  it('returns the LoginLayout in getLayout', () => {
    const page = 'page'
    expect(Login.getLayout(page)).toEqual(<LoginLayout>page</LoginLayout>)
  })
})
