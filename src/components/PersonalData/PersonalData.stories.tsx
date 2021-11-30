import React from 'react'
import type { Meta } from '@storybook/react'
import PersonalData from './PersonalData'

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

export const PersonalDataPlaceholder = () => (
  <PersonalData name="Michael Hall" />
)
