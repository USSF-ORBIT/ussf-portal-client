/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { getCollectionsMock } from '../../../fixtures/getCollection'
import { cmsBookmarksMock } from '../../../fixtures/cmsBookmarks'
import Home, { getStaticProps } from 'pages/beta/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

describe('Beta Home page', () => {
  beforeEach(() => {
    render(
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
