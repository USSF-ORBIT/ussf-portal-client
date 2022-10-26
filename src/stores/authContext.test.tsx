/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import { testUser1 } from '../__fixtures__/authUsers'

import { AuthProvider, useAuthContext } from './authContext'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.post.mockImplementation(() => {
  return Promise.resolve()
})

describe('Auth context', () => {
  const { location } = window

  beforeAll((): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      href: '',
    }
  })

  beforeEach(() => {
    const TestComponent = () => {
      const { user, setUser, login, logout } = useAuthContext()

      const mockUserData = testUser1

      return (
        <div>
          <h1>User: {user?.userId}</h1>
          <button type="button" onClick={login}>
            Log in
          </button>
          <button type="button" onClick={logout}>
            Log out
          </button>
          <button type="button" onClick={() => setUser(mockUserData)}>
            Set mock user data
          </button>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
  })

  afterAll((): void => {
    window.location = location
  })

  it('the user defaults to null', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('User:')
  })

  it('handles a log in action', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Log in' }))

    expect(window.location.href).toEqual('/api/auth/login')
  })

  it('can set the user', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Set mock user data' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'User: BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil'
    )
  })

  it('handles a log out action', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Log out' }))

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/logout')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'User:'
      )
      expect(screen.getByRole('heading', { level: 1 })).not.toHaveTextContent(
        'User: BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil'
      )

      expect(window.location.href).toEqual('/login')
    })
  })
})

describe('useAuthContext', () => {
  it('throws an error if AuthContext is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined)
    expect(() => useAuthContext()).toThrowError()
  })

  it('returns the created context', () => {
    const { result } = renderHook(() => useAuthContext())
    expect(result.current).toBeTruthy()
    expect(result.current.user).toEqual(null)
  })
})
