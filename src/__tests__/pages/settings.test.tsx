/**
 * @jest-environment jsdom
 */

import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import { axe } from 'jest-axe'
import axios from 'axios'
import Settings, { getStaticProps } from 'pages/settings'

import { renderWithAuth } from '../../testHelpers'

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

describe('Settings page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(
        <MockedProvider>
          <Settings />
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
          <Settings />
        </MockedProvider>
      )
    })

    it('renders the settings page', () => {
      expect(screen.getAllByText('Settings')).toHaveLength(1)

      expect(screen.getAllByText('Update name and rank:')).toHaveLength(1)
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

    it('returns the expected props in getServerSideProps', async () => {
      const response = await getStaticProps()
      expect(response).toEqual({
        props: {
          pageTitle: 'Settings',
        },
      })
    })
  })
})
