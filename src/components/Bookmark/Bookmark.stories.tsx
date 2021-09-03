import React from 'react'
import { Meta } from '@storybook/react'
import Bookmark from './Bookmark'

export default {
  title: 'Components/Bookmark',
  component: Bookmark,
} as Meta

export const ExampleBookmark = () => <Bookmark href="#">Example</Bookmark>
