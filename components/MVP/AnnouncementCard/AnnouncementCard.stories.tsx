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
}

export const BirthdayAnnouncementCard = () => (
  <AnnouncementCard
    heading={birthday.heading}
    body={birthday.body}
    tag={birthday.tag}
    bgColor={birthday.bgColor}
  />
)

// const csoTownhall = {
//   heading: `Video from the Chief of Space Operations's latest townhall`,
//   tag: 'News',
// }

// export const townhallAnnouncementCard = () => (
//   <AnnouncementCard heading={csoTownhall.heading} tag={csoTownhall.tag} />
// )
