import React from 'react'
import { Meta } from '@storybook/react'
import Header from './Header'
import HeaderWithoutNav from './HeaderWithoutNav'

export default {
  title: 'Navigation/Header',
  component: Header,
} as Meta

export const DefaultHeader = () => <Header />

export const NoNavHeader = () => <HeaderWithoutNav />
