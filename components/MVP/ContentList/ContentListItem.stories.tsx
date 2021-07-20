import React from 'react'
import { Meta } from '@storybook/react'
import ContentListItem from './ContentListItem'
import ContentListGroup from './ContentListGroup'

export default {
  title: 'Components/List',
  component: ContentListItem,
  decorators: [
    (Story) => (
      <ContentListGroup>
        <Story />
      </ContentListGroup>
    ),
  ],
} as Meta

export const ListItem = () => (
  <ContentListItem heading="milConnect" path="/mil-connect">
    Check your health insurance coverage. Schedule a CAC appointment or update
    your account info.
  </ContentListItem>
)
