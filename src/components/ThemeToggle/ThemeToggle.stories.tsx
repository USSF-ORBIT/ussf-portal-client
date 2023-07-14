import React from 'react'
import { Meta } from '@storybook/react'

import { testPortalUser1, testUser1 } from '../../__fixtures__/authUsers'

import ThemeToggle from './ThemeToggle'

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
  title: 'Base/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story, context) => {
      mockContext.portalUser.theme = context.globals.theme
      return (
        <AuthContext.Provider value={mockContext}>
          <Story />
        </AuthContext.Provider>
      )
    },
  ],
} as Meta

export const WithUser = () => <ThemeToggle />

export const NoUser = () => <ThemeToggle />

NoUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={{ ...mockContext, user: null }}>
      <Story />
    </AuthContext.Provider>
  ),
]
