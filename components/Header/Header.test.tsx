/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Header from './Header'

describe('Header component', () => {
  it('renders the Space Force logo', () => {
    render(<Header />)
    expect(screen.getByAltText('Space Force')).toBeInTheDocument()
  })

  it('renders the primary navigation links', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    // There are two "Home" links because the logo is also one
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks).toHaveLength(2)
    homeLinks.forEach((l) => {
      expect(l).toBeInstanceOf(HTMLAnchorElement)
    })

    // Test for other links
    expect(screen.getByRole('link', { name: 'News' })).toBeInstanceOf(
      HTMLAnchorElement
    )
    expect(
      screen.getByRole('link', { name: 'Training and education' })
    ).toBeInstanceOf(HTMLAnchorElement)
    expect(screen.getByRole('link', { name: 'About us' })).toBeInstanceOf(
      HTMLAnchorElement
    )
  })

  it('renders the Service Portal subnav', () => {
    render(<Header />)

    const toggleButton = screen.getByRole('button', {
      name: 'Your Service Portal',
    })
    expect(toggleButton).toBeInstanceOf(HTMLButtonElement)

    userEvent.click(toggleButton)

    expect(screen.getByRole('link', { name: 'Army' })).toBeInstanceOf(
      HTMLAnchorElement
    )
    expect(screen.getByRole('link', { name: 'Navy' })).toBeInstanceOf(
      HTMLAnchorElement
    )
    expect(screen.getByRole('link', { name: 'Air Force' })).toBeInstanceOf(
      HTMLAnchorElement
    )
    expect(screen.getByRole('link', { name: 'Marines' })).toBeInstanceOf(
      HTMLAnchorElement
    )
    expect(screen.getByRole('link', { name: 'Coast Guard' })).toBeInstanceOf(
      HTMLAnchorElement
    )
  })
})
