import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { GovBanner } from '@trussworks/react-uswds'
import defaultStyles from '../layout/DefaultLayout/DefaultLayout.module.scss'
import errorStyles from '../layout/ErrorLayout/ErrorLayout.module.scss'
import loginStyles from '../layout/LoginLayout/LoginLayout.module.scss'

export default {
  title: 'Base/GovBanner',
  component: GovBanner,
  argTypes: {
    tld: { control: 'string' },
  },
  args: {
    tld: '.mil',
  },
} as Meta<typeof GovBanner>

type Story = StoryObj<typeof GovBanner>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className={defaultStyles.siteContainer}>
        <Story />
      </div>
    ),
  ],
}

export const Error: Story = {
  decorators: [
    (Story) => (
      <div className={errorStyles.errorContainer}>
        <Story />
      </div>
    ),
  ],
}

export const Login: Story = {
  decorators: [
    (Story) => (
      <div className={loginStyles.layoutLogin}>
        <Story />
      </div>
    ),
  ],
}
