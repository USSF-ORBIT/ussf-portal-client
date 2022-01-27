/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { useAnalytics } from './analyticsContext'

describe('useAnalytics', () => {
  it('throws an error if AnalyticsContext is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined)
    expect(() => useAnalytics()).toThrowError()
  })

  it('returns the created context', () => {
    const { result } = renderHook(() => useAnalytics())
    expect(result.current).toBeTruthy()
    expect(result.current.push).toBeTruthy()
    expect(result.current.trackEvent).toBeTruthy()
  })
})
