/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from 'pages/beta/index'

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
})
