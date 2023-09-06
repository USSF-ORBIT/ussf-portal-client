/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, renderHook } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from 'next-themes'
import { portalUserNoCollections, testUser1 } from '../__fixtures__/authUsers'

import { mockUseTheme } from '../testHelpers'
import { useUser } from './useUser'

import * as useAuthContextHooks from 'stores/authContext'

import { AuthProvider } from 'stores/authContext'
import { getUserMock, getUserNullMock } from '__fixtures__/operations/getUser'

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

const mockSetPortalUser = jest.fn()

const { setItemMock } = mockUseTheme()

describe('useUser hook', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  beforeEach(() => {
    mockSetPortalUser.mockReset()
    mockedAxios.get.mockReset()
    setItemMock.mockReset()
  })

  describe('with user logged in', () => {
    beforeEach(() => {
      jest
        .spyOn(useAuthContextHooks, 'useAuthContext')
        .mockImplementation(() => {
          return {
            user: testUser1,
            setPortalUser: mockSetPortalUser,
            portalUser: null,
            setUser: jest.fn(),
            logout: jest.fn(),
            login: jest.fn(),
          }
        })
    })

    test('fetches and sets the portal user in the context', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>
          <MockedProvider mocks={getUserMock}>
            <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
          </MockedProvider>
        </AuthProvider>
      )
      renderHook(() => useUser(), { wrapper })
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        expect(mockSetPortalUser).toHaveBeenCalledWith({
          mySpace: portalUserNoCollections.mySpace,
          displayName: portalUserNoCollections.displayName,
          theme: portalUserNoCollections.theme,
        })
        expect(setItemMock).toHaveBeenCalledWith(
          'theme',
          portalUserNoCollections.theme
        )
      })
    })

    test('sets the theme in the theme context', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>
          <MockedProvider mocks={getUserMock}>
            <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
          </MockedProvider>
        </AuthProvider>
      )
      renderHook(() => useUser(), { wrapper })
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        expect(setItemMock).toHaveBeenCalledWith(
          'theme',
          portalUserNoCollections.theme
        )
      })
    })

    test('returns expected values', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>
          <MockedProvider mocks={getUserMock}>
            <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
          </MockedProvider>
        </AuthProvider>
      )
      const { result } = renderHook(() => useUser(), { wrapper })
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        expect(result.current).toMatchObject({
          loading: false,
          user: testUser1,
          portalUser: {
            mySpace: portalUserNoCollections.mySpace,
            displayName: portalUserNoCollections.displayName,
            theme: portalUserNoCollections.theme,
          },
        })
      })
    })
  })

  describe('user is not logged in', () => {
    beforeEach(() => {
      jest
        .spyOn(useAuthContextHooks, 'useAuthContext')
        .mockImplementation(() => {
          return {
            user: null,
            setPortalUser: mockSetPortalUser,
            portalUser: null,
            setUser: jest.fn(),
            logout: jest.fn(),
            login: jest.fn(),
          }
        })
    })

    test('returns true if loading done but no user', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>
          <MockedProvider mocks={getUserNullMock}>
            <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
          </MockedProvider>
        </AuthProvider>
      )
      const { result } = renderHook(() => useUser(), { wrapper })
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(result.current).toMatchObject({
        loading: true,
        user: null,
        portalUser: undefined,
      })
    })

    test('does not set theme if data returned by useGetUserQuery is null', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>
          <MockedProvider mocks={getUserNullMock}>
            <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
          </MockedProvider>
        </AuthProvider>
      )
      renderHook(() => useUser(), { wrapper })
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(setItemMock).not.toHaveBeenCalled()
    })
  })
})
