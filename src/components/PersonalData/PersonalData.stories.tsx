import React from 'react'
import type { Meta } from '@storybook/react'
import PersonalData from './PersonalData'
import { AuthContext } from 'stores/authContext'

const mockContext = {
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
  setUser: () => {
    return
  },
  logout: () => {
    return
  },
  login: () => {
    return
  },
}

export default {
  title: 'Components/PersonalData',
  decorators: [
    (Story) => (
      <AuthContext.Provider value={mockContext}>
        <div className="sfds">
          <Story />
        </div>
      </AuthContext.Provider>
    ),
  ],
} as Meta

export const PersonalDataPlaceholder = () => <PersonalData />
