import React from 'react'
import { Meta } from '@storybook/react'
import { CardGroup } from '@trussworks/react-uswds'
import AnnouncementCard from './AnnouncementCard'
import type { AnnouncementCardProps } from './AnnouncementCard'

export default {
  title: 'Components/Cards',
  component: AnnouncementCard,
  decorators: [
    (Story) => (
      <div className="desktop:grid-col-10">
        <CardGroup>
          <Story />
        </CardGroup>
      </div>
    ),
  ],
} as Meta

// About Card example
const birthday: AnnouncementCardProps = {
  heading: 'Happy Birthday! 🎉',
  body: `It's been a ONE-derful year!`,
  tag: 'about',
  bgColor: 'birthdayCard',
  cols: 6,
  path: '/about-us/accomplishments/',
}

export const BirthdayAnnouncementCard = () => <AnnouncementCard {...birthday} />

// Training Card example
const forceMultiplier: AnnouncementCardProps = {
  heading:
    'Start your journey in digital fluency with our Force Multiplier program.',
  tag: 'training',
  bgColor: 'gradient--blue bg-primary',
  cols: 6,
  path: '/training-and-education/force-multiplier-program/',
}

export const forceMultiplierCard = () => (
  <AnnouncementCard {...forceMultiplier} />
)

// News Card example
const physicalAssessment: AnnouncementCardProps = {
  heading: 'Physical fitness assessments will resume July 1st 2021',
  tag: 'news',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: 6,
  path: 'https://www.spaceforce.mil/News/Article/2525699/pt-test-pushed-to-july-updates-to-scoring-physical-components-ahead/',
}

export const physicalAssessmentCard = () => (
  <AnnouncementCard {...physicalAssessment} />
)

// Example of News page grid
const rankNews: AnnouncementCardProps = {
  heading: 'Space Force rank names',
  tag: 'news',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: true,
  path: 'https://www.spaceforce.mil/News/Article/2487814/space-force-releases-service-specific-rank-names/',
}

const officerNews: AnnouncementCardProps = {
  heading: 'Officer stratification guidance changed',
  tag: 'news',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: true,
  path: 'https://www.spaceforce.mil/News/Article/2519922/air-force-announces-officer-stratification-guidance/',
}
const csoNews: AnnouncementCardProps = {
  heading: "Chief of Space Operations's Planning Guidance",
  tag: 'news',
  bgColor: 'gradient--orange bg-accent-warm-dark',
  cols: true,
  path: 'https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF',
}

export const newsGrid = () => (
  <>
    <AnnouncementCard {...rankNews} />
    <AnnouncementCard {...officerNews} />
    <AnnouncementCard {...csoNews} />
  </>
)
