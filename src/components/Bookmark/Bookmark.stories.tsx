import React from 'react'
import { Meta } from '@storybook/react'
import Bookmark from './Bookmark'

type StorybookArgTypes = {
  onDelete: () => void
  onEdit: () => void
}

export default {
  title: 'Components/Collections/Bookmark',
  component: Bookmark,
  argTypes: { onDelete: { action: 'Deleted' }, onEdit: { action: 'Edited' } },
} as Meta

export const ExampleBookmark = () => <Bookmark href="#">Example</Bookmark>

export const WithDescription = () => (
  <Bookmark href="#" bookmarkDescription="My example description">
    Lorem ipsum
  </Bookmark>
)

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

export const WithEditHandler = (argTypes: StorybookArgTypes) => (
  <Bookmark href="#" onEdit={argTypes.onEdit}>
    Edit Me
  </Bookmark>
)

export const DisabledLink = () => (
  <Bookmark href="#" disabled>
    Example
  </Bookmark>
)
