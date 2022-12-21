import React from 'react'
import { Meta } from '@storybook/react'
import Logo from './Logo'

export default {
  title: 'Global/Logo',
  component: Logo,
} as Meta

export const DefaultLogo = () => <Logo />

export const AbbreviatedLogo = () => <Logo abbreviated />

export const DarkBg = () => (
  <div className="padding-1" style={{ backgroundColor: '#070f1d' }}>
    <Logo darkBg />
  </div>
)

export const NoText = () => (
  <div className="padding-1" style={{ backgroundColor: '#070f1d' }}>
    <Logo noText />
  </div>
)
