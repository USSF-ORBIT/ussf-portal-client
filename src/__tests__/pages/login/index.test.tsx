/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithAuth } from '../../../testHelpers'

import Login, { getStaticProps } from 'pages/login/index'
import LoginLayout from 'layout/LoginLayout/LoginLayout'

const mockLogin = jest.fn()

describe('Login page', () => {
  beforeEach(() => {
    renderWithAuth(<Login />, { login: mockLogin })
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

  it('renders the open accordion on click', async () => {
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'Contact the Help Desk' })
    await user.click(button)
    expect(screen.getByTestId('accordionItem_a1')).toBeVisible()
  })

  it('renders the notice', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Notice'
    )
  })

  it('renders the login button', async () => {
    const user = userEvent.setup()
    const loginButton = screen.getByRole('button', { name: 'Log In' })
    expect(loginButton).toBeInTheDocument()
    await user.click(loginButton)
    expect(mockLogin).toHaveBeenCalled()
  })

  it('returns the LoginLayout in getLayout', () => {
    const page = 'page'
    expect(Login.getLayout(page)).toEqual(<LoginLayout>page</LoginLayout>)
  })

  it('returns the expected props in getStaticProps', async () => {
    const response = await getStaticProps()
    expect(response).toEqual({
      props: {
        pageTitle: 'Log In',
      },
    })
  })
})
