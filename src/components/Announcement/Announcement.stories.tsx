import React from 'react'
import { Meta } from '@storybook/react'
import Announcement from './Announcement'

export default {
  title: 'Components/Announcement',
  component: Announcement,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultAnnouncement = () => <Announcement />
