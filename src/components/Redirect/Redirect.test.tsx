/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { Redirect } from './Redirect'

describe('Redirect component', () => {
  test('renders the redirect', () => {
    const expectedUrl = 'https://cms.example.com'
    render(<Redirect redirectTo={expectedUrl} />)

    expect(screen.getByRole('link', { name: expectedUrl })).toBeVisible()
    expect(screen.getByRole('link', { name: expectedUrl })).toHaveAttribute(
      'href',
      'https://cms.example.com'
    )
    expect(screen.getByRole('heading', { name: 'Redirect' })).toBeVisible()
  })
})
