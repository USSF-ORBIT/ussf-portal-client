/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'

import { testUser1 } from '../__fixtures__/authUsers'

import { useUser } from './useUser'

import { AuthProvider } from 'stores/authContext'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.post.mockImplementation(() => {
  return Promise.resolve()
})

const mockUserData = testUser1

describe('useUser hook', () => {
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

  afterAll((): void => {
    window.location = location
  })

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
      expect(window.location.href).toEqual('/login')
    })
  })
})
