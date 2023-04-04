import React from 'react'
import type { Meta } from '@storybook/react'

import { testUser1, testPortalUser1 } from '../../__fixtures__/authUsers'

import PersonalData from './PersonalData'

import { AuthContext } from 'stores/authContext'

const mockContext = {
  user: testUser1,
  portalUser: testPortalUser1,
  setUser: () => {
    return
  },
  setPortalUser: () => {
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
  title: 'Base/PersonalData',
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const WithUser = () => <PersonalData userDisplayName="Test Name" />

WithUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={mockContext}>
      <div className="sfds">
        <Story />
      </div>
    </AuthContext.Provider>
  ),
]

export const NoUser = () => <PersonalData userDisplayName="Test Name" />

NoUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={{ ...mockContext, user: null }}>
      <div className="sfds">
        <Story />
      </div>
    </AuthContext.Provider>
  ),
]
