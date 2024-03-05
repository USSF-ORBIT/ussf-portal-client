/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import Logo from './Logo'

describe('Logo component', () => {
  test('renders the logo image', () => {
    render(<Logo />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/img/ussf-logo.svg')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'USSF Logo')
  })

  test('renders the dark bg logo image', () => {
    render(<Logo darkBg />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/SpaceForce_Horizontal_Gradient_RGBmod-01.svg'
    )
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'United States Space Force Logo'
    )
  })

  test('renders the abbreviated logo image', () => {
    render(<Logo abbreviated />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/img/ussf-logo-short.svg'
    )
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'USSF Logo')
  })

  test('has no a11y violations', async () => {
    const { container } = render(<Logo />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
