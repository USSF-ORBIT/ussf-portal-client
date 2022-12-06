import React from 'react'
import { Meta } from '@storybook/react'

import LoadingWidget from './LoadingWidget'

export default {
  title: 'Base/LoadingWidget',
  component: LoadingWidget,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultLoadingWidget = () => <LoadingWidget />
