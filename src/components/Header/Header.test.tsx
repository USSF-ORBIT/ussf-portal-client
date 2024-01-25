/**
 * @jest-environment jsdom
 */

import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import { renderWithAuthAndApollo } from '../../testHelpers'
import Header from './Header'
import { getThemeMock } from '__fixtures__/operations/getTheme'

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
  let user: ReturnType<typeof userEvent.setup>
  beforeEach(() => {
    renderWithAuthAndApollo(<Header />, { logout: mockLogout }, getThemeMock)
    user = userEvent.setup()
  })
  it('renders the USSF portal header', () => {
    expect(
      screen.getByRole('img', { name: 'United States Space Force Logo' })
    ).toHaveAttribute('alt', 'United States Space Force Logo')
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
  it('can open the About Us dropdown on click and close on mouse leave', async () => {
    const dropdown = screen.getByTestId('nav-about-us-dropdown')
    const aboutTheUSSF = screen.getByTestId('nav-about-ussf')

    await user.click(dropdown)
    expect(screen.getByRole('link', { name: 'About the USSF' })).toBeVisible()

    fireEvent.mouseLeave(dropdown)
    expect(aboutTheUSSF).not.toBeVisible()
  })

  it('can mouse over items from the About Us dropdown', async () => {
    const aboutTheUSSF = screen.getByTestId('nav-about-ussf')
    expect(aboutTheUSSF).not.toBeVisible()

    const dropdown = screen.getByTestId('nav-about-us-dropdown')
    await user.click(dropdown)
    expect(aboutTheUSSF).toBeVisible()

    // Mouse over items, and mouse away to close the menu
    fireEvent.mouseEnter(aboutTheUSSF)
    expect(aboutTheUSSF).toBeVisible()
    fireEvent.mouseLeave(aboutTheUSSF)
    expect(aboutTheUSSF).not.toBeVisible()
  })

  it('can toggle navigation on smaller screen sizes', async () => {
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await user.click(screen.getByLabelText('Close Navigation Menu'))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('can click the overlay to close the mobile navigation', async () => {
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await user.click(screen.getByRole('presentation'))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('renders the logout button', async () => {
    const logoutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logoutButton).toBeInTheDocument()
    await user.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = renderWithAuthAndApollo(
        <Header />,
        {},
        getThemeMock
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
