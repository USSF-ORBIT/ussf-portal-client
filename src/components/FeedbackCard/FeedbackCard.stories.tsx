import React from 'react'
import type { Meta } from '@storybook/react'
import FeedbackCard from './FeedbackCard'

export default {
  title: 'Components/FeedbackCard',
  component: FeedbackCard,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultFeedbackCard = () => <FeedbackCard />
