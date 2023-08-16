import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import WeatherWidget from './WeatherWidget'
import { WeatherWidget as WeatherWidgetType } from 'types'

const mockWeatherWidget: WeatherWidgetType = {
  _id: new ObjectId(),
  type: 'Weather',
  title: 'Weather',
  coords: {
    lat: 34.0901,
    long: -118.4065,
    forecastUrl: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast',
    hourlyForecastUrl:
      'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
    city: 'Beverly Hills',
    state: 'CA',
    zipcode: '90210',
  },
}

export default {
  title: 'Components/WeatherWidget',
  component: WeatherWidget,
} as Meta

export const AddWeatherWidget = () => <WeatherWidget />

export const WeatherWidgetWithData = () => (
  <WeatherWidget widget={mockWeatherWidget} />
)
