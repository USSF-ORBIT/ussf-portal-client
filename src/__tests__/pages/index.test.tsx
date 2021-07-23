/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import Home from 'pages/index'

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders the Covid Alert', () => {
    expect(screen.getByTestId('covid-alert')).toBeInTheDocument()
  })
})
