import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import GuardianIdealCarousel from './GuardianIdealCarousel'
import type { IdealListItem, Widget } from 'types'

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
  _id: new ObjectId(),
  title: 'Guardian Ideal',
  type: 'GuardianIdeal',
}

const mockIdeals: IdealListItem[] = [
  {
    id: '849eb02a-ac3d-4dfd-a95d-5a4868d9d9b5',
    title: 'Connect in a Collaborative Environment',
    labels: [
      {
        id: 'label1',
        name: 'Guardian Ideal',
        type: 'Source',
      },
    ],
    publishedDate: '',
    body: 'The purpose of this objective is to set the conditions to create a fearless organizational culture so all individuals can contribute to their full potential.',
  },
  {
    id: 'f9a97504-bc2e-4996-b3a5-331b53fba3c8',
    title: 'Lead Digital Enablement',
    labels: [
      {
        id: 'label2', // this should be changed
        name: 'Guardian Ideal',
        type: 'Source',
      },
    ],
    publishedDate: '',
    body: 'Digital fluency is foundational to being a Guardian. Full-spectrum digital enablement will allow us to realize the tenets of the CSO’s Planning Guidance to empower Space Force to be a lean and agile military service.',
  },
  {
    id: '494bae34-695f-4b20-acb2-99d9ff85c6fe',
    title: 'Generate and Engage Talent',
    labels: [
      {
        id: 'label3',
        name: 'Guardian Ideal',
        type: 'Source',
      },
    ],
    publishedDate: '',
    body: 'One of the most important focus areas of the Space Force is the effort to find the best and most diverse talent we need to advance our mission contributing to the joint warfight.',
  },
]

export const DefaultGuardianIdealCarousel = () => (
  <GuardianIdealCarousel ideals={mockIdeals} widget={mockWidget} />
)
