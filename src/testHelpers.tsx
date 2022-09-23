import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

import { testUser1 } from './__fixtures__/authUsers'
import { AuthContext, AuthContextType } from 'stores/authContext'

export const renderWithModalRoot = (
  ui: React.ReactElement,
  options: RenderOptions = {}
) => {
  const modalContainer = document.createElement('div')
  modalContainer.setAttribute('id', 'modal-root')

  return render(ui, {
    ...options,
    container: document.body.appendChild(modalContainer),
  })
}

export const defaultMockAuthContext = {
  user: testUser1,
  setUser: jest.fn(),
  logout: jest.fn(),
  login: jest.fn(),
}

/** Renders the component inside of an already-authenticated AuthProvider */
/** You can pass custom auth context values (user, mock functions) as needed */
export const renderWithAuth = (
  component: React.ReactElement,
  value: Partial<AuthContextType> = {}
) => {
  const contextValue = {
    ...defaultMockAuthContext,
    ...value,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )

  return render(component, { wrapper })
}

/** Renders the component inside of an already-authenticated AuthProvider and a MockedProvider*/
/** You can pass custom auth context values (user, mock functions) as needed */
/** You can pass graphql mocks as needed */
export const renderWithAuthAndApollo = (
  component: React.ReactElement,
  value: Partial<AuthContextType> = {},
  mocks: readonly MockedResponse<Record<string, unknown>>[] = []
) => {
  const contextValue = {
    ...defaultMockAuthContext,
    ...value,
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={contextValue}>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}>
        {children}
      </MockedProvider>
    </AuthContext.Provider>
  )

  return render(component, { wrapper })
}

/** sets up some mocks for the useTheme hook **/
export const mockUseTheme = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  const localStorageMock: { [key: string]: string } = {}
  const getItemMock = jest.fn((key: string) => localStorageMock[key])
  const setItemMock = jest.fn((key: string, value: string) => {
    localStorageMock[key] = value
  })
  global.Storage.prototype.getItem = getItemMock
  // eslint-disable-next-line security/detect-object-injection
  global.Storage.prototype.setItem = setItemMock

  // eslint-disable-next-line security/detect-object-injection
  return { getItemMock, setItemMock }
}
