/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import Home from 'pages/beta/index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: [
          {
            _id: '34',
            title: 'Example Collection',
            bookmarks: [
              {
                _id: '3',
                url: 'https://google.com',
                label: 'Webmail',
                description: 'Lorem ipsum',
                cmsId: null,
                isRemoved: null,
              },
              {
                _id: '4',
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                description: 'Lorem ipsum',
                cmsId: '1',
                isRemoved: null,
              },
              {
                _id: '5',
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                description: 'Lorem ipsum',
                cmsId: '2',
                isRemoved: null,
              },
            ],
          },
        ],
      },
    },
  },
]

const mockBookmarks = [
  {
    id: '1',
    url: 'www.example.com',
    label: 'Example 1',
  },
  {
    id: '2',
    url: 'www.example2.com',
    label: 'Example 2',
  },
]

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
      renderWithAuth(<Home bookmarks={mockBookmarks} />, { user: null })
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
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home bookmarks={mockBookmarks} />
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
