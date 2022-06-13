import React from 'react'
import { Meta } from '@storybook/react'
import AnnouncementCarousel from './AnnouncementCarousel'

export default {
  title: 'Components/AnnouncementCarousel',
  component: AnnouncementCarousel,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultCarousel = () => <AnnouncementCarousel />
