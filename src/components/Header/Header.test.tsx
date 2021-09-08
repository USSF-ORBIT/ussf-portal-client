/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import Header from './Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('Header component', () => {
  it('renders the USSF portal header', () => {
    render(<Header />)

    expect(screen.getByRole('img', { name: 'USSF Logo' })).toHaveAttribute(
      'alt',
      'USSF Logo'
    )
    expect(screen.getAllByRole('link')).toHaveLength(4)
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

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<Header />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
