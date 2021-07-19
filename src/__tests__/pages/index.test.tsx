/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import Home from 'pages/index'

describe('Home page', () => {
  it('renders the title', () => {
    render(<Home />)
    expect(screen.getByText('USSF Portal')).toBeInTheDocument()
  })
})
