import React from 'react'
import type { Meta } from '@storybook/react'

import PersonalData from './PersonalData'

export default {
  title: 'Base/PersonalData',
} as Meta

export const Default = () => <PersonalData userDisplayName="Test Name" />
