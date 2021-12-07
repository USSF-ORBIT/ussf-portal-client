/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { getCollectionsMock } from '../../../fixtures/getCollection'
import Home, { getStaticProps } from 'pages/beta/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

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
      <MockedProvider mocks={getCollectionsMock} addTypename={false}>
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
      name: 'Edit collection title',
    })
    expect(collectionTitle).toHaveTextContent('Example Collection')
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
