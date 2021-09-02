/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Custom404 from 'pages/404'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

describe('404 page', () => {
  beforeEach(() => {
    render(<Custom404 />)
  })

  it('renders the custom 404 page,', () => {
    expect(screen.getByRole('heading', { name: 'Error status' }))
  })

  it('renders the Go Home button', () => {
    expect(screen.getByRole('link', { name: 'Go Home' }))
  })

  it('returns the Default Beta Layout in getLayout', () => {
    const page = 'page'
    expect(Custom404.getLayout(page)).toEqual(<Layout>page</Layout>)
  })
})
