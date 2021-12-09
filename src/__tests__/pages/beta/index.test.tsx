/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import { getCollectionsMock } from '../../../fixtures/getCollection'
import { cmsBookmarksMock } from '../../../fixtures/cmsBookmarks'
import Home from 'pages/beta/index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

describe('Beta Home page', () => {
  describe('without a user', () => {
    const { location } = window

    beforeAll((): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete window.location
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.location = {
        href: '',
      }
    })

    afterAll((): void => {
      window.location = location
    })

    beforeEach(() => {
      renderWithAuth(<Home bookmarks={cmsBookmarksMock} />, { user: null })
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(window.location.href).toEqual('/login')
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
      expect(screen.getByText('Loading...')).toBeInTheDocument()
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
