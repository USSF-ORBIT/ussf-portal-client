import React from 'react'
import type { Meta } from '@storybook/react'

import PageHeader from './PageHeader'

import PersonalData from 'components/PersonalData/PersonalData'

export default {
  title: 'Layout/PageHeader',
  component: PageHeader,
} as Meta

export const PortalHome = () => (
  <PageHeader>
    <PersonalData />
  </PageHeader>
)
