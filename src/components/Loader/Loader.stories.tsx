import React from 'react'
import { Meta } from '@storybook/react'

import Loader from './Loader'

export default {
  title: 'Components/Loader',
  component: Loader,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultLoader = () => <Loader />
