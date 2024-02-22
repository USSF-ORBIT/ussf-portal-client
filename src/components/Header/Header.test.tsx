/**
 * @jest-environment jsdom
 */

import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import { renderWithAuthAndApollo } from '../../testHelpers'
import Header from './Header'
import { getThemeMock } from '__fixtures__/operations/getTheme'
import { getSiteHeaderMock } from '__fixtures__/operations/getSiteHeader'

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
    renderWithAuthAndApollo(<Header />, { logout: mockLogout }, [
      getThemeMock,
      getSiteHeaderMock,
    ])
    user = userEvent.setup()
  })
  test('renders the USSF portal header', () => {
    expect(
      screen.getByRole('img', { name: 'United States Space Force Logo' })
    ).toHaveAttribute('alt', 'United States Space Force Logo')
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  test('can toggle navigation on smaller screen sizes', async () => {
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await user.click(screen.getByLabelText('Close Navigation Menu'))
    expect(nav).not.toHaveClass('is-visible')
  })

  test('can click the overlay to close the mobile navigation', async () => {
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('is-visible')

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(nav).toHaveClass('is-visible')

    await user.click(screen.getByRole('presentation'))
    expect(nav).not.toHaveClass('is-visible')
  })

  test('renders the logout button', async () => {
    const logoutButton = screen.getByTestId('nav_logout')
    expect(logoutButton).toBeInTheDocument()
    // await user.click(logoutButton)
    // expect(mockLogout).toHaveBeenCalled()
  })

  test('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = renderWithAuthAndApollo(<Header />, {}, [
        getThemeMock,
      ])
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
