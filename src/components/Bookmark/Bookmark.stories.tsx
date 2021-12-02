import React from 'react'
import { Meta } from '@storybook/react'
import Bookmark from './Bookmark'

type StorybookArgTypes = {
  onDelete: () => void
}

export default {
  title: 'Components/Bookmark',
  component: Bookmark,
  argTypes: { onDelete: { action: 'Deleted' } },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleBookmark = () => <Bookmark href="#">Example</Bookmark>

export const WithLongText = () => (
  <Bookmark href="#">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  </Bookmark>
)

export const WithDeleteHandler = (argTypes: StorybookArgTypes) => (
  <Bookmark href="#" onDelete={argTypes.onDelete}>
    Delete Me
  </Bookmark>
)

export const DisabledLink = () => (
  <Bookmark href="#" disabled>
    Example
  </Bookmark>
)
