/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'
import { SearchProvider } from 'stores/searchContext'

describe('Search component', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders the search form ', () => {
    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    )

    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  test.skip('renders the dropdown options', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  test('renders the searchbox', async () => {
    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    )

    const searchbox = screen.getByTestId('search-input')

    expect(searchbox).toBeInTheDocument()

    fireEvent.change(searchbox, { target: { value: 'test' } })
    expect(searchbox).toHaveValue('test')
  })

  test('renders the search button', () => {
    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    )

    expect(screen.getByRole('button')).toHaveTextContent('Search')
  })

  test('submits the search form', async () => {
    const user = userEvent.setup()
    const mockSubmit = jest.fn()

    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    )

    const form = screen.getByRole('search')
    form.addEventListener('submit', mockSubmit)

    const searchbox = screen.getByTestId('search-input')

    expect(searchbox).toBeInTheDocument()

    fireEvent.change(searchbox, { target: { value: 'test' } })
    expect(searchbox).toHaveValue('test')

    const submitButton = screen.getByRole('button', { name: 'Search' })
    expect(submitButton).toBeInTheDocument()

    await user.click(submitButton)

    expect(mockSubmit).toHaveBeenCalled()
  })

  test('trims the search query if it is greater than 200 characters', async () => {
    const user = userEvent.setup()

    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    )

    const searchbox = screen.getByTestId('search-input')

    expect(searchbox).toBeInTheDocument()

    // 'test' has 4 characters, so 51 * 4 = 204 characters
    fireEvent.change(searchbox, {
      target: {
        value: 'test'.repeat(51),
      },
    })

    const submitButton = screen.getByRole('button', { name: 'Search' })
    expect(submitButton).toBeInTheDocument()

    await user.click(submitButton)

    // Check that the search query is trimmed to 200 characters
    // 4 characters * 50 = 200 characters
    expect(searchbox).toHaveValue('test'.repeat(50))
  })

  test.skip('renders the suggested terms', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Are you looking for:'
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
