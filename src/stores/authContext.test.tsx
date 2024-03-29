/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor, renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { useAnalytics } from './analyticsContext'
import { AuthProvider, useAuthContext } from './authContext'

import { testUser1, testUser1Session } from '__fixtures__/authUsers'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.post.mockImplementation(() => {
  return Promise.resolve()
})

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

const mockedUseAnalytics = useAnalytics as jest.Mock
const mockSetUserIdFn = jest.fn()
const mockUnsetUserIdFn = jest.fn()

mockedUseAnalytics.mockReturnValue({
  setUserIdFn: mockSetUserIdFn,
  unsetUserIdFn: mockUnsetUserIdFn,
})

jest.mock('./analyticsContext', () => ({
  useAnalytics: jest.fn(),
}))

const expectedPathname = encodeURIComponent('/path/to/redirect')

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
          <button type="button" onClick={() => login(null)}>
            Log in
          </button>
          <button type="button" onClick={() => login('/path/to/redirect')}>
            Log in with redirect
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

  test('the user defaults to null', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('User:')
  })

  test('handles a log in action', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Log in' }))

    expect(window.location.href).toEqual('/api/auth/login')
  })

  test('handles a log in action with redirectTo', async () => {
    const user = userEvent.setup()
    await user.click(
      screen.getByRole('button', { name: 'Log in with redirect' })
    )

    expect(window.location.href).toEqual(
      `/api/auth/login?RelayState=${expectedPathname}`
    )
  })

  test('can set the user', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Set mock user data' }))

    expect(mockSetUserIdFn).toHaveBeenCalled()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'User: BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil'
    )
  })

  test('handles a log out action', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Log out' }))

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/logout')
    expect(mockUnsetUserIdFn).toHaveBeenCalled()

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

  describe('session user', () => {
    test('fetches the user client side and sets it in the context', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: { user: testUser1Session } })
      })

      // mockedAxios.post.mockImplementation(() => {
      //   return Promise.resolve({ data: { data: testUser1Personnel } })
      // })

      const response = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
        // expect(mockedAxios.post).toHaveBeenCalledWith('/api/graphql', {
        //   query: print(GetPersonnelDataDocument),
        // })
        expect(response.result.current.user).toEqual(testUser1Session)
      })
    })

    test('fetches the user client-side and redirects to the login page if there is no user', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
        expect(result.current.user).toEqual(null)
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })

    test('does not add redirectTo for root pathname', async () => {
      mockedUseRouter.mockReturnValue({
        route: '',
        pathname: '/',
        query: '',
        asPath: '',
        push: jest.fn(),
        replace: mockReplace,
      })

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
        expect(result.current.user).toEqual(null)
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })

    test('passes pathname as RelayState if not on login page', async () => {
      mockedUseRouter.mockReturnValue({
        route: '',
        pathname: '/path/to/redirect',
        query: '',
        asPath: '/path/to/redirect',
        push: jest.fn(),
        replace: mockReplace,
      })

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
        expect(result.current.user).toEqual(null)
        expect(mockReplace).toHaveBeenCalledWith(
          `/login?redirectTo=/path/to/redirect`
        )
      })
    })
  })
})

describe('useAuthContext', () => {
  test('throws an error if AuthContext is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined as never)
    expect(() => useAuthContext()).toThrowError()
  })

  test('returns the created context', () => {
    const { result } = renderHook(() => useAuthContext())
    expect(result.current).toBeTruthy()
    expect(result.current.user).toEqual(null)
  })
})
