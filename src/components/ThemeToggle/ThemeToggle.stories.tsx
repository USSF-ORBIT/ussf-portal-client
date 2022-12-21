import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { testUser1 } from '../../__fixtures__/authUsers'

import ThemeToggle from './ThemeToggle'

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
  title: 'Base/ThemeToggle',
  component: ThemeToggle,
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

export const WithUser = () => <ThemeToggle />

export const NoUser = () => <ThemeToggle />

NoUser.decorators = [
  (Story: any) => (
    <AuthContext.Provider value={{ ...mockContext, user: null }}>
      <div className="sfds">
        <Story />
      </div>
    </AuthContext.Provider>
  ),
]
