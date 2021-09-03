/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import Bookmark from './Bookmark'

describe('Bookmark component', () => {
  it('renders an anchor link', () => {
    render(<Bookmark href="/home">Home</Bookmark>)

    const link = screen.getByRole('link', {
      name: 'Home',
    })

    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveTextContent('Home')
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })
})
