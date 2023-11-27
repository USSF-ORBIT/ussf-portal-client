import React from 'react'
import { Meta } from '@storybook/react'
import { Redirect } from './Redirect'

export default {
  title: 'Components/Redirect',
  component: Redirect,
} as Meta

export const Default = () => <Redirect redirectTo="http://example.com" />
