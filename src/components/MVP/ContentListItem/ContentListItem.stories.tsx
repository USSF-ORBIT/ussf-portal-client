import React from 'react'
import { Meta } from '@storybook/react'
import ContentListGroup from '../ContentListGroup/ContentListGroup'
import ContentListItem from './ContentListItem'

export default {
  title: 'Components/Content List',
  component: ContentListItem,
  decorators: [
    (Story) => (
      <ContentListGroup heading="List Title">
        <Story />
      </ContentListGroup>
    ),
  ],
} as Meta

export const DefaultContentList = () => (
  <ContentListItem heading="milConnect" path="/mil-connect">
    Check your health insurance coverage. Schedule a CAC appointment or update
    your account info.
  </ContentListItem>
)
