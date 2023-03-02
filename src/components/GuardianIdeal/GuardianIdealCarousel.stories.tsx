import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'mongodb'
import GuardianIdealCarousel from './GuardianIdealCarousel'
import { GuardianIdealPillars } from './GuardianIdealPillars'
import { Widget } from 'types'

export default {
  title: 'Components/GuardianIdealCarousel',
  component: GuardianIdealCarousel,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const mockWidget: Widget = {
  _id: ObjectId(),
  title: 'Guardian Ideal',
  type: 'GuardianIdeal',
}

export const DefaultGuardianIdealCarousel = () => (
  <GuardianIdealCarousel ideals={GuardianIdealPillars} widget={mockWidget} />
)
