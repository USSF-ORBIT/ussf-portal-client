/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'
import { useModalContext } from './modalContext'

describe('useModalContext', () => {
  it('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
