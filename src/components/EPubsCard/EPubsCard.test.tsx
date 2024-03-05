/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'

import React from 'react'

import EPubsCard from './EPubsCard'

describe('EPubsCard component', () => {
  test('renders the card', () => {
    render(<EPubsCard query="test" />)

    expect(screen.getAllByText('Looking for a form?')).toHaveLength(1)

    const link = screen.getByRole('link', {
      name: 'Search ePubs',
    })

    expect(link).toHaveAttribute(
      'href',
      'https://search.usa.gov/search?affiliate=afpw_epubs&query=test'
    )
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })
})
