/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import LoginNotice from 'pages/login-notice'
import LoginLayout from 'layout/LoginLayout/LoginLayout'

describe('LoginNotice page', () => {
  beforeEach(() => {
    render(<LoginNotice />)
  })

  it('renders the login notice', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Notice'
    )
  })

  it('renders the agree button', () => {
    expect(screen.getByRole('link')).toHaveTextContent('I agree')
  })

  it('returns the LoginLayout in getLayout', () => {
    const page = 'page'
    expect(LoginNotice.getLayout(page)).toEqual(<LoginLayout>page</LoginLayout>)
  })
})
