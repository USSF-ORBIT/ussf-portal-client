import React from 'react'
import type { Meta } from '@storybook/react'
import FeedbackCard from './FeedbackCard'

export default {
  title: 'Base/FeedbackCard',
  component: FeedbackCard,
} as Meta

export const DefaultFeedbackCard = () => <FeedbackCard />
