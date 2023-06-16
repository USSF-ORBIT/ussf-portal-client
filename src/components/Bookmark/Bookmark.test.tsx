/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'
import { cmsBookmarksMock } from '../../__fixtures__/data/cmsBookmarks'
import Bookmark from './Bookmark'

describe('Bookmark component', () => {
  test('renders an anchor link', () => {
    render(<Bookmark href="/home">Home</Bookmark>)

    const link = screen.getByRole('link', {
      name: 'Home (opens in a new window)',
    })

    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveTextContent('Home')
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })

  test('renders a delete button if a handler is provided', async () => {
    const user = userEvent.setup()
    const mockOnDelete = jest.fn()

    render(
      <Bookmark href="/home" onDelete={mockOnDelete}>
        Home
      </Bookmark>
    )

    const button = screen.getByRole('button')
    await user.click(button)
    expect(mockOnDelete).toHaveBeenCalled()
  })

  test('displays tooltip when focused', async () => {
    const user = userEvent.setup()

    render(
      <Bookmark
        href="/home"
        bookmarkDescription={cmsBookmarksMock[0].description}>
        Home
      </Bookmark>
    )
    const link = screen.getByRole('link', {
      name: 'Home (opens in a new window)',
    })

    await user.tab()
    expect(link).toHaveFocus()

    expect(
      screen.queryByText(cmsBookmarksMock[0].description)
    ).toBeInTheDocument()
  })

  test('displays tooltip when hovering', async () => {
    const user = userEvent.setup()

    render(
      <Bookmark
        href="/home"
        bookmarkDescription={cmsBookmarksMock[0].description}>
        Home
      </Bookmark>
    )
    const link = screen.getByRole('link', {
      name: 'Home (opens in a new window)',
    })

    await user.hover(link)

    expect(
      screen.queryByText(cmsBookmarksMock[0].description)
    ).toBeInTheDocument()

    await user.unhover(link)

    expect(
      screen.queryByText(cmsBookmarksMock[0].description)
    ).not.toBeInTheDocument()
  })

  test('has no a11y violations', async () => {
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
    test('renders static text instead of a link', () => {
      render(
        <Bookmark href="/home" disabled>
          Home
        </Bookmark>
      )

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInstanceOf(HTMLSpanElement)
    })

    test('has no a11y violations', async () => {
      const { container } = render(
        <Bookmark href="/home" disabled>
          Home
        </Bookmark>
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
