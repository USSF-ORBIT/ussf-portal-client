import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { MockedProvider } from '@apollo/client/testing'
import { testPortalUser1, testUser1 } from '../../__fixtures__/authUsers'

import ThemeToggle from './ThemeToggle'
import { GetUserDocument } from 'operations/portal/queries/getUser.g'

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
    (Story, { globals, parameters }) => {
      const mocks = [
        {
          request: {
            query: GetUserDocument,
          },
          result: () => ({
            data: {
              displayName: 'BERNADETTE CAMPBELL',
              mySpace: [],
              theme: parameters.happo.themes[0] || globals.theme,
            },
          }),
        },
      ]
      return (
        <AuthContext.Provider value={mockContext}>
          <MockedProvider mocks={mocks}>
            <Story />
          </MockedProvider>
        </AuthContext.Provider>
      )
    },
  ],
} as Meta

type Story = StoryObj<typeof ThemeToggle>

// We over ride the normal option of multiple themes in happo
// since we want to only show this specific one. Dynamically
// switching the theme in storybook doesn't work well with
// the theme toggle button
export const WithUserLight: Story = {
  parameters: {
    happo: {
      themes: ['light'],
    },
  },
}
export const WithUserDark: Story = {
  parameters: {
    happo: {
      themes: ['dark'],
    },
  },
}

export const NoUser: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{ ...mockContext, user: null }}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
}
