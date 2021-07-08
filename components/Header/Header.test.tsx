/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import Header from './Header'

describe('Header component', () => {
  it('renders the Space Force logo', () => {
    render(<Header />)
    expect(screen.getByAltText('Space Force')).toBeInTheDocument()
  })
})
