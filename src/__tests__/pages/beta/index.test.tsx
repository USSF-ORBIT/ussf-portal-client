/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { v4 } from 'uuid'

import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import Home, { getStaticProps } from 'pages/beta/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

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
    render(
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
    )
    expect(
      await screen.findByRole('button', {
        name: 'Example Collection',
      })
    )
  })

  it('returns the Default Beta Layout in getLayout', async () => {
    const page = 'page'
    expect(Home.getLayout(page)).toEqual(<Layout>page</Layout>)
  })
})

describe('getStaticProps', () => {
  it('returns expected props', async () => {
    const results = await getStaticProps()
    expect(results).toEqual({ props: { bookmarks: [] } })
  })
})
