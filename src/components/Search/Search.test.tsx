/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'

import Search from './Search'

describe('Search component', () => {
  beforeEach(() => {
    render(<Search />)
  })

  it('renders the search form ', () => {
    expect(screen.getByRole('search')).toBeInTheDocument()
  })
  it('renders the dropdown options', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  it('renders the searchbox', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('renders the search button', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Search')
  })

  it('renders the suggested terms', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Are you looking for:'
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
