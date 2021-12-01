/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { v4 } from 'uuid'

import { renderWithAuth, defaultMockAuthContext } from '../../../testHelpers'

import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import Home from 'pages/beta/index'

jest.mock('lib/session')

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: [
          {
            id: v4(),
            title: 'Example Collection',
            bookmarks: [
              {
                id: v4(),
                url: 'https://google.com',
                label: 'Webmail',
                description: 'Lorem ipsum',
              },
              {
                id: v4(),
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                description: 'Lorem ipsum',
              },
              {
                id: v4(),
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                description: 'Lorem ipsum',
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
  beforeEach(() => {
    renderWithAuth(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home user={defaultMockAuthContext.user} bookmarks={mockBookmarks} />
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
      name: 'Edit collection title',
    })
    expect(collectionTitle).toHaveTextContent('Example Collection')
  })
})
