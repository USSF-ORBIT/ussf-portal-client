import React from 'react'
import type { Meta } from '@storybook/react'
import EPubsCard from './EPubsCard'

export default {
  title: 'Base/EPubsCard',
  component: EPubsCard,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultEPubsCard = () => <EPubsCard query="my test query" />
