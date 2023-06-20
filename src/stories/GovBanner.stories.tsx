import React from 'react'
import { ComponentMeta } from '@storybook/react'
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
} as ComponentMeta<typeof GovBanner>

export const Default = () => (
  <div className={`${defaultStyles.siteContainer} sfds`}>
    <GovBanner tld=".mil" />
  </div>
)

export const Error = () => (
  <div className={`${errorStyles.errorContainer} sfds`}>
    <GovBanner tld=".mil" />
  </div>
)

export const Login = () => (
  <div className={`${loginStyles.layoutLogin} sfds`}>
    <GovBanner tld=".mil" />
  </div>
)
