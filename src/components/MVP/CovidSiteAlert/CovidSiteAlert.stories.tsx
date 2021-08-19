import React from 'react'
import { Meta } from '@storybook/react'
import CovidSiteAlert from './CovidSiteAlert'

export default {
  title: 'MVP/Components/Alert',
  component: CovidSiteAlert,
  decorators: [
    (Story) => (
      <div className="mvp">
        <Story />
      </div>
    ),
  ],
} as Meta

export const CovidAlert = () => <CovidSiteAlert />
