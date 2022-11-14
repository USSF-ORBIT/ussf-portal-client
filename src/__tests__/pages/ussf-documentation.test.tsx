/**
 * @jest-environment jsdom
 */

import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import { axe } from 'jest-axe'
import axios from 'axios'
import { renderWithAuth } from '../../testHelpers'
import USSFDocumentation from 'pages/ussf-documentation'

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('axios')

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

describe('USSF Documentation page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(
        <MockedProvider>
          <USSFDocumentation />
        </MockedProvider>,
        { user: null }
      )
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
    let html: RenderResult

    beforeEach(() => {
      html = renderWithAuth(
        <MockedProvider>
          <USSFDocumentation />
        </MockedProvider>
      )
    })

    it('renders the settings page', () => {
      expect(screen.getAllByText('Official USSF documentation')).toHaveLength(1)

      expect(screen.getAllByText('Essential Reading')).toHaveLength(1)
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    it('makes the call to get user', () => {
      expect(axios.get).toHaveBeenLastCalledWith('/api/auth/user')
    })
  })
})
