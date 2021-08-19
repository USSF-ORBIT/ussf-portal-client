import React from 'react'
import { Meta } from '@storybook/react'

import Identifier from './Identifier'

export default {
  title: 'MVP/Components/Identifier',
  component: Identifier,
  decorators: [
    (Story) => (
      <div className="mvp">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultIdentifier = () => <Identifier />
