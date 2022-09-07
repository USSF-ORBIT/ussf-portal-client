/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle component', () => {
  it('renders the component', () => {
    render(<ThemeToggle />)

    const toggleBtn = screen.getByTestId('theme-toggle')
    expect(toggleBtn).toBeVisible()

    userEvent.click(toggleBtn)
    expect(screen.getAllByText('light mode')).toHaveLength(1)
  })
})

// TODO: Once we are displaying the ThemeToggle component, add test to check that trackEvent is called
