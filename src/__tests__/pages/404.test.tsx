/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../testHelpers'

import Custom404 from 'pages/404'

const mockReplace = jest.fn()

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
  replace: mockReplace,
})

describe('404 page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<Custom404 />, { user: null })
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      renderWithAuth(<Custom404 />)
    })

    it('renders the custom 404 page,', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404')
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Looks like you’re a little lost'
      )
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'That page doesn’t exist (or never did). Let’s get you back where you belong.'
      )
    })

    it('renders a go home button', () => {
      expect(
        screen.getByRole('link', { name: 'Take me home' })
      ).toHaveAttribute('href', '/')
    })
  })
})
