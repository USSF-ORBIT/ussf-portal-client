import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
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
  user: {
    nameID: 'HALL.MICHAEL.1234567890',
    nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    attributes: {
      edipi: '1234567890',
      givenname: 'MICHAEL',
      sans: 'msupn:1234567890@mil',
      surname: 'HALL',
      userprincipalname: 'HALL.MICHAEL.1234567890',
      ivgroups: 'AF_USERS',
    },
  },
  setUser: jest.fn(),
  logout: jest.fn(),
  login: jest.fn(),
}

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
