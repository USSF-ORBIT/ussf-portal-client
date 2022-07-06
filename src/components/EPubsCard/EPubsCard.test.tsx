/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'

import React from 'react'

import EPubsCard from './EPubsCard'

describe('EPubsCard component', () => {
  it('renders the card', () => {
    render(<EPubsCard query="test" />)

    expect(screen.getAllByText('Looking for a form?')).toHaveLength(1)

    const link = screen.getByRole('link', {
      name: 'Search ePubs',
    })

    expect(link).toHaveAttribute(
      'href',
      'https://www.e-publishing.af.mil/Product-Index/#/?view=search&keyword=test&isObsolete=false&modID=449&tabID=131'
    )
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })
})
