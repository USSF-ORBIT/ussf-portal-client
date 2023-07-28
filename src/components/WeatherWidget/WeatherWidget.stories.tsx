import React from 'react'
import { Meta } from '@storybook/react'

import WeatherWidget from './WeatherWidget'

export default {
  title: 'Components/WeatherWidget',
  component: WeatherWidget,
} as Meta

export const WeatherWidgetExample = () => <WeatherWidget />
