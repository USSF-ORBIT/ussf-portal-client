import React from 'react'
import { Meta } from '@storybook/react'
import AnnouncementLaunch from './AnnouncementLaunch'

export default {
  title: 'Components/AnnouncementLaunch',
  component: AnnouncementLaunch,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const LaunchAnnouncement = () => <AnnouncementLaunch />
