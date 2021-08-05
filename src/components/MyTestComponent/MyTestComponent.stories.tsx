import React from 'react'
import { Meta } from '@storybook/react'
import MyTestComponent from './MyTestComponent'

export default {
  title: 'Tests/MyTestComponent',
  component: MyTestComponent,
} as Meta

export const DefaultTestComponent = () => <MyTestComponent />
