import React from 'react'
import { Meta } from '@storybook/react'
import AnnouncementCard from './AnnouncementCard'
import type { AnnouncementCardProps } from './AnnouncementCard'

export default {
  title: 'Components/Cards',
  component: AnnouncementCard,
} as Meta

const birthday: AnnouncementCardProps = {
  heading: 'Happy Birthday! 🎉',
  body: `It's been a ONE-derful year!`,
  tag: 'about',
  bgColor: 'birthdayCard',
  cols: 3,
  path: '/about-us/accomplishments/',
}

// Use a decorator to always render the card in a <CardGroup>
export const BirthdayAnnouncementCard = () => <AnnouncementCard {...birthday} />

const forceMultiplier: AnnouncementCardProps = {
  heading:
    'Start your journey in digital fluency with our Force Multiplier program.',
  tag: 'training',
  bgColor: 'gradient--blue bg-primary',
  cols: 6,
  path: '/training-and-education/force-multiplier-program/',
}
// Use a decorator to always render the card in a <CardGroup>
export const forceMultiplierCard = () => (
  <AnnouncementCard {...forceMultiplier} />
)

const physicalAssessment: AnnouncementCardProps = {
  heading: 'Physical fitness assessments will resume July 1st 2021',
  tag: 'news',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: 3,
  path: 'https://www.spaceforce.mil/News/Article/2525699/pt-test-pushed-to-july-updates-to-scoring-physical-components-ahead/',
}
// Use a decorator to always render the card in a <CardGroup>
export const physicalAssessmentCard = () => (
  <AnnouncementCard {...physicalAssessment} />
)
