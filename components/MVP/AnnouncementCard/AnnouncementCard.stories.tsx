import React from 'react'
import { Meta } from '@storybook/react'
import { ColumnSizes } from '@trussworks/react-uswds/lib/components/grid/types'
import AnnouncementCard from './AnnouncementCard'

export default {
  title: 'Components/Cards',
  component: AnnouncementCard,
} as Meta

interface AnnouncementCardProps {
  heading: string
  body?: string
  bgImage?: string
  tag: string
  bgColor: string
  cols: ColumnSizes
}

const birthday: AnnouncementCardProps = {
  heading: 'Happy Birthday! 🎉',
  body: `It's been a ONE-derful year!`,
  tag: 'About',
  bgColor: 'bg-black',
  bgImage:
    'linear-gradient(to right,rgba(0,0,0,.8) 66%,rgba(117,19,93,0) 96%), url(/img/bday.webp)',
  cols: 3,
}

export const BirthdayAnnouncementCard = () => <AnnouncementCard {...birthday} />

const forceMultiplier: AnnouncementCardProps = {
  heading:
    'Start your journey in digital fluency with our Force Multiplier program.',
  tag: 'Training',
  bgColor: 'gradient--blue bg-primary',
  cols: 6,
}
export const forceMultiplierCard = () => (
  <AnnouncementCard {...forceMultiplier} />
)

const physicalAssessment: AnnouncementCardProps = {
  heading: 'Physical fitness assessments will resume July 1st 2021',
  tag: 'News',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: 3,
}

export const physicalAssessmentCard = () => (
  <AnnouncementCard {...physicalAssessment} />
)
