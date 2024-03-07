/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import PageHeader from './PageHeader'

describe('PageHeader component', () => {
  test('renders Search Component', () => {
    render(<PageHeader>Children</PageHeader>)
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
})
