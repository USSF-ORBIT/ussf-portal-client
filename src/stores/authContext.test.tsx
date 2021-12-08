/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

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

      const mockUserData = {
        nameID: 'TEST.USER.1234567890',
        nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        attributes: {
          edipi: '1234567890',
          givenname: 'Test',
          sans: 'msupn:1234567890@mil',
          surname: 'User',
          userprincipalname: 'TEST.USER.1234567890',
          ivgroups: 'AF_USERS',
        },
      }

      return (
        <div>
          <h1>User: {user?.nameID}</h1>
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

  it('handles a log in action', () => {
    userEvent.click(screen.getByRole('button', { name: 'Log in' }))
    expect(window.location.href).toEqual('/api/auth/login')
  })

  it('can set the user', () => {
    userEvent.click(screen.getByRole('button', { name: 'Set mock user data' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'User: TEST.USER.1234567890'
    )
  })

  it('handles a log out action', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Log out' }))
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/logout')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'User:'
      )
      expect(screen.getByRole('heading', { level: 1 })).not.toHaveTextContent(
        'User: TEST.USER.1234567890'
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
