import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

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
/** You can pass custom context values (user, mock functions) as needed */
export const renderWithAuth = (
  component: React.ReactElement,
  value: Partial<AuthContextType> = {}
) => {
  const contextValue = {
    ...defaultMockAuthContext,
    ...value,
  }

  return render(
    <AuthContext.Provider value={contextValue}>
      {component}
    </AuthContext.Provider>
  )
}
