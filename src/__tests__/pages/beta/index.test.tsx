/**
 * @jest-environment jsdom
 */

import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import axios from 'axios'
import { useRouter } from 'next/router'
import { axe } from 'jest-axe'

import { renderWithAuth } from '../../../testHelpers'

import { getMySpaceMock } from '../../../__fixtures__/operations/getMySpace'
import { cmsBookmarksMock } from '../../../__fixtures__/data/cmsBookmarks'
import Home from 'pages/beta/index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

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

describe('Beta Home page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<Home bookmarks={cmsBookmarksMock} />, { user: null })
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
        <MockedProvider mocks={getMySpaceMock} addTypename={false}>
          <Home bookmarks={cmsBookmarksMock} />
        </MockedProvider>
      )
    })

    it('renders the loading page,', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('renders the home page', async () => {
      expect(
        await screen.findByRole('heading', {
          level: 2,
          name: 'Welcome to the new Space Force Service Portal!',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 2,
          name: 'My Space',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Example Collection',
        })
      ).toBeInTheDocument()
      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Maxed Out Collection',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Recent News',
        })
      ).toBeInTheDocument()
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
