/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { useRouter } from 'next/router'

import { testUser1 } from '../__fixtures__/authUsers'

import { useUser } from './useUser'

import { AuthProvider } from 'stores/authContext'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.post.mockImplementation(() => {
  return Promise.resolve()
})

const mockUserData = testUser1

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

describe('useUser hook', () => {
  it('sets the user in context if one is provided', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useUser(mockUserData), { wrapper })
    expect(result.current.user).toEqual(mockUserData)
    expect(mockedAxios.get).not.toHaveBeenCalled()
  })

  it('fetches the user client-side and sets it in context if one is not provided', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    mockedAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: { user: mockUserData } })
    })

    const { result } = renderHook(() => useUser(), { wrapper })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
      expect(result.current.user).toEqual(mockUserData)
    })
  })

  it('fetches the user client-side and redirects to the login page if there is no user', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    mockedAxios.get.mockImplementationOnce(() => {
      return Promise.reject()
    })

    const { result } = renderHook(() => useUser(), { wrapper })

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/user')
      expect(result.current.user).toEqual(null)
      expect(mockReplace).toHaveBeenCalledWith('/login')
    })
  })
})
