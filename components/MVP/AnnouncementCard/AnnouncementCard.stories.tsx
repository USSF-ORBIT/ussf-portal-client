import React from 'react'
import { Meta } from '@storybook/react'

import AnnouncementCard from './AnnouncementCard'

export default {
  title: 'Components/Cards',
  component: AnnouncementCard,
} as Meta

const birthday = {
  heading: 'Happy Birthday! 🎉',
  body: `It's been a ONE-derful year!`,
  tag: 'About',
  bgColor: 'bg-primary',
  textColor: 'text-white',
  bgTag: 'bg-secondary',
}

export const BirthdayAnnouncementCard = () => <AnnouncementCard {...birthday} />

const csoTownhall = {
  heading: `Video from the Chief of Space Operations's latest townhall`,
  tag: 'News',
  bgColor: 'bg-primary-darker',
  textColor: 'text-white',
  bgTag: 'bg-primary',
}

export const townhallAnnouncementCard = () => (
  <AnnouncementCard {...csoTownhall} />
)
