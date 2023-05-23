/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from './Search'

describe('Search component', () => {
  beforeEach(() => {
    render(<Search disabled={false} />)
  })

  test('renders the search form ', () => {
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  test.skip('renders the dropdown options', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  test('renders the searchbox', async () => {
    const searchbox = screen.getByTestId('search-input')

    expect(searchbox).toBeInTheDocument()

    fireEvent.change(searchbox, { target: { value: 'test' } })
    expect(searchbox).toHaveValue('test')
  })

  test('renders the search button', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Search')
  })

  test.skip('renders the suggested terms', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Are you looking for:'
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
