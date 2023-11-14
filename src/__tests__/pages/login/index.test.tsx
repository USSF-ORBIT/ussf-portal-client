/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../../testHelpers'

import Login, { getStaticProps } from 'pages/login/index'
import LoginLayout from 'layout/LoginLayout/LoginLayout'

const mockLogin = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: jest.fn(),
})

describe('Login page', () => {
  describe('without redirectTo present', () => {
    beforeEach(() => {
      renderWithAuth(<Login />, { login: mockLogin })
    })

    test('renders the page title', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Space Force Portal Login'
      )
    })

    test('renders the accordion title', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        'Contact the Help Desk'
      )
    })

    test('renders the accordion item as hidden on page load', () => {
      expect(screen.getByTestId('accordionItem_a1')).not.toBeVisible()
    })

    test('renders the open accordion on click', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', {
        name: 'Contact the Help Desk',
      })
      await user.click(button)
      expect(screen.getByTestId('accordionItem_a1')).toBeVisible()
    })

    test('renders the notice', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Notice'
      )
    })

    test('renders the login button', async () => {
      const user = userEvent.setup()
      const loginButton = screen.getByRole('button', { name: 'Log In' })
      expect(loginButton).toBeInTheDocument()
      await user.click(loginButton)
      expect(mockLogin).toHaveBeenCalled()
    })

    test('returns the LoginLayout in getLayout', () => {
      const page = 'page'
      expect(Login.getLayout(page)).toEqual(<LoginLayout>page</LoginLayout>)
    })

    test('returns the expected props in getStaticProps', async () => {
      const response = await getStaticProps()
      expect(response).toEqual({
        props: {
          pageTitle: 'Log In',
        },
      })
    })
  })

  describe('when redirectTo present', () => {
    beforeEach(() => {
      mockedUseRouter.mockReturnValue({
        route: '',
        pathname: '',
        query: {
          redirectTo: '/path/to/redirect',
        },
        asPath: '',
        push: jest.fn(),
        replace: jest.fn(),
      })
      renderWithAuth(<Login />, { login: mockLogin })
    })

    test('renders login button with passes redirectTo if present', async () => {
      const user = userEvent.setup()
      const loginButton = screen.getByRole('button', { name: 'Log In' })
      expect(loginButton).toBeInTheDocument()
      await user.click(loginButton)
      expect(mockLogin).toHaveBeenCalledWith('/path/to/redirect')
    })
  })
})
