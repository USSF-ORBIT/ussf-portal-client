/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import PageHeader from './PageHeader'

describe('PageHeader component', () => {
  it('renders Search Component if LaunchDarkly returns true', () => {
    render(<PageHeader flags={{ searchComponent: true }}>Children</PageHeader>)
    const search = screen.getByRole('searchbox', { name: 'Search' })
    expect(search).toBeInTheDocument()

    // The preview text should be hidden if search is enabled
    const previewText = screen.queryByRole('heading', {
      name: 'Search coming soon!',
    })
    expect(previewText).toBeNull()

    const submitBtn = screen.getByRole('button', { name: 'Search' })
    expect(submitBtn).not.toBeDisabled()
  })

  it('does not render visible Search Component if LaunchDarkly returns false', () => {
    render(<PageHeader flags={{ searchComponent: false }}>Children</PageHeader>)

    expect(
      screen.getByRole('heading', { name: 'Search coming soon!', level: 4 })
    ).toBeInTheDocument()

    const submitBtn = screen.getByRole('button', { name: 'Search' })
    expect(submitBtn).toBeDisabled()
  })
})
