import React from 'react'
import type { Meta } from '@storybook/react'

import { testUser1 } from '../../__fixtures__/authUsers'

import PersonalData from './PersonalData'

import { AuthContext } from 'stores/authContext'

const mockContext = {
  user: testUser1,
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
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const WithUser = () => <PersonalData />

WithUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={mockContext}>
      <div className="sfds">
        <Story />
      </div>
    </AuthContext.Provider>
  ),
]

export const NoUser = () => <PersonalData />

NoUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={{ ...mockContext, user: null }}>
      <div className="sfds">
        <Story />
      </div>
    </AuthContext.Provider>
  ),
]
