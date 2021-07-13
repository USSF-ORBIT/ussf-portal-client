import React from 'react'
import { Meta } from '@storybook/react'
import CovidSiteAlert from './CovidSiteAlert'

export default {
  title: 'Components/Alert',
  component: CovidSiteAlert,
} as Meta

export const Alert = () => <CovidSiteAlert />
