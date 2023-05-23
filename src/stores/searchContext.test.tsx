/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook, screen } from '@testing-library/react'
import { renderWithAuth } from '../testHelpers'
import { SearchProvider, useSearchContext } from 'stores/searchContext'

describe('Search context', () => {
  test('renders the children passed to SearchProvider', () => {
    const TestComponent = () => {
      return <div>Test</div>
    }

    renderWithAuth(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})

describe('useSearchContext', () => {
  test('returns the created context', () => {
    const { result } = renderHook(() => useSearchContext())
    expect(result.current).toBeTruthy()
  })

  test('throws an error if SearchContext is undefined', () => {
    // Test that correct error is thrown when SearchContext is undefined
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined)
    expect(() => useSearchContext()).toThrowError()
  })
})
