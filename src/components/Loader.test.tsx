/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import Loader from './Loader'

describe('Loader component', () => {
  it('renders loading text', () => {
    render(<Loader />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
