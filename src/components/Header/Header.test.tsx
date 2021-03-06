/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import { renderWithAuth } from '../../testHelpers'

import Header from './Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

const mockLogout = jest.fn()

describe('Header component', () => {
  it('renders the USSF portal header', () => {
    render(<Header />)

    expect(
      screen.getByRole('img', { name: 'United States Space Force Logo' })
    ).toHaveAttribute('alt', 'United States Space Force Logo')
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('can toggle navigation on smaller screen sizes', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    userEvent.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    userEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('can click the overlay to close the mobile navigation', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    userEvent.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    userEvent.click(screen.getByRole('presentation'))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('renders the logout button', () => {
    renderWithAuth(<Header />, { logout: mockLogout })
    const logoutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logoutButton).toBeInTheDocument()
    userEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<Header />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
