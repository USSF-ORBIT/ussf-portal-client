/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import Bookmark from './Bookmark'

describe('Bookmark component', () => {
  it('renders an anchor link', () => {
    render(<Bookmark href="/home">Home</Bookmark>)

    const link = screen.getByRole('link', {
      name: 'Home (opens in a new window)',
    })

    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveTextContent('Home')
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })

  it('renders a delete button if a handler is provided', () => {
    const mockOnDelete = jest.fn()

    render(
      <Bookmark href="/home" onDelete={mockOnDelete}>
        Home
      </Bookmark>
    )

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(mockOnDelete).toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const mockOnDelete = jest.fn()

      const { container } = render(
        <Bookmark onDelete={mockOnDelete} href="/home">
          Home
        </Bookmark>
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when disabled', () => {
    it('renders static text instead of a link', () => {
      render(
        <Bookmark href="/home" disabled>
          Home
        </Bookmark>
      )

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInstanceOf(HTMLSpanElement)
    })

    it('has no a11y violations', async () => {
      const { container } = render(
        <Bookmark href="/home" disabled>
          Home
        </Bookmark>
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
