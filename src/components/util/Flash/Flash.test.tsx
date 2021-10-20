/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import React from 'react'

import Flash from './Flash'

describe('Flash component', () => {
  const testFlash = <p>Test flash message</p>

  it('renders its children', () => {
    render(<Flash handleClear={jest.fn()}>{testFlash}</Flash>)
  })

  it('calls the clear function after a timeout', () => {
    jest.useFakeTimers()

    const mockHandleClear = jest.fn()

    render(<Flash handleClear={mockHandleClear}>{testFlash}</Flash>)

    jest.runAllTimers()

    expect(mockHandleClear).toHaveBeenCalled()
  })

  it('resets the timeout if the children change', () => {
    jest.useFakeTimers()
    const mockHandleClear = jest.fn()

    const { rerender } = render(
      <Flash handleClear={mockHandleClear}>{testFlash}</Flash>
    )

    jest.advanceTimersByTime(2000)

    rerender(<Flash handleClear={mockHandleClear}>Another flash</Flash>)

    jest.advanceTimersByTime(2000)
    expect(mockHandleClear).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)
    expect(mockHandleClear).toHaveBeenCalled()
  })

  it('clears the timeout when unmounted', () => {
    jest.useFakeTimers()
    const mockHandleClear = jest.fn()

    const { unmount } = render(
      <Flash handleClear={mockHandleClear}>{testFlash}</Flash>
    )

    unmount()
    jest.runAllTimers()
    expect(mockHandleClear).not.toHaveBeenCalled()
  })
})
