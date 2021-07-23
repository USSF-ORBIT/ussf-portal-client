/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import LinkTo from './LinkTo'

describe('LinkTo component', () => {
  render(
    <LinkTo href="/home" className="text-ink">
      Home
    </LinkTo>
  )
  it('renders the link and props', () => {
    const link = screen.getByRole('link', {
      name: 'Home',
    })

    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveTextContent('Home')
    expect(link).toHaveClass('text-ink')
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })
})
