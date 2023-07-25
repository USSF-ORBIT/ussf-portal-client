import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import GuardianIdealCarousel from './GuardianIdealCarousel'
import { GuardianIdealPillars } from './GuardianIdealPillars'
import type { Widget } from 'types'

export default {
  title: 'Components/GuardianIdealCarousel',
  component: GuardianIdealCarousel,
} as Meta

const mockWidget: Widget = {
  _id: new ObjectId(),
  title: 'Guardian Ideal',
  type: 'GuardianIdeal',
}

export const DefaultGuardianIdealCarousel = () => (
  <GuardianIdealCarousel ideals={GuardianIdealPillars} widget={mockWidget} />
)
