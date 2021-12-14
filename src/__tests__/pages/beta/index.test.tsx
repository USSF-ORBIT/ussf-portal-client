/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import axios from 'axios'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../../testHelpers'

import { getCollectionsMock } from '../../../__fixtures__/operations/getCollection'
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
    beforeEach(() => {
      renderWithAuth(
        <MockedProvider mocks={getCollectionsMock} addTypename={false}>
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
          name: 'My Space',
        })
      ).toBeInTheDocument()

      const collectionTitle = await screen.findByRole('button', {
        name: 'Edit Example Collection collection title',
      })
      expect(collectionTitle).toHaveTextContent('Example Collection')
    })
  })
})
