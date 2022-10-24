/**
 * @jest-environment jsdom
 */

import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import { renderWithAuthAndApollo } from '../../testHelpers'
import { editThemeMock } from '../../__fixtures__/operations/editTheme'

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
    renderWithAuthAndApollo(<Header />, {}, editThemeMock)

    expect(
      screen.getByRole('img', { name: 'United States Space Force Logo' })
    ).toHaveAttribute('alt', 'United States Space Force Logo')
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('can click an item from the About Us dropdown', async () => {
    renderWithAuthAndApollo(<Header />, {}, editThemeMock)

    const aboutTheUSSF = screen.getByTestId('nav-about-ussf')
    expect(aboutTheUSSF).not.toBeVisible()

    const dropdown = screen.getByTestId('nav-about-us-dropdown')
    await userEvent.click(dropdown)
    expect(aboutTheUSSF).toBeVisible()
  })

  it('can toggle navigation on smaller screen sizes', async () => {
    renderWithAuthAndApollo(<Header />, {}, editThemeMock)

    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await userEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('can click the overlay to close the mobile navigation', async () => {
    renderWithAuthAndApollo(<Header />, {}, editThemeMock)

    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await userEvent.click(screen.getByRole('presentation'))
    expect(nav).not.toHaveClass('is-visible')
  })

  it('renders the logout button', async () => {
    renderWithAuthAndApollo(<Header />, { logout: mockLogout }, editThemeMock)
    const logoutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logoutButton).toBeInTheDocument()
    await userEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = renderWithAuthAndApollo(
        <Header />,
        {},
        editThemeMock
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
