/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from 'pages/beta/index'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

describe('Beta Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders the home page,', () => {
    expect(screen.getByRole('heading', { name: 'Success' }))
  })

  it('renders the Leave Beta button', () => {
    expect(screen.getByRole('button', { name: 'Leave Beta' }))
  })

  it('returns the Default Beta Layout in getLayout', () => {
    const page = 'page'
    expect(Home.getLayout(page)).toEqual(<Layout>page</Layout>)
  })
})
