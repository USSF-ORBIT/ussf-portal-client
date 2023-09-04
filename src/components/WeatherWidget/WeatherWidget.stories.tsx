import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import WeatherWidget from './WeatherWidget'
import { WeatherWidget as WeatherWidgetType } from 'types'
import { mockHourlyForecastFunc } from '__fixtures__/data/hourlyForecast'

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

const mockWeatherWidgetNoForecast: WeatherWidgetType = {
  _id: new ObjectId(),
  type: 'Weather',
  title: 'Weather',
  coords: {
    lat: 34.0901,
    long: -118.4065,
    forecastUrl: '',
    hourlyForecastUrl: '',
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

export const ErrorState = () => (
  <WeatherWidget widget={mockWeatherWidgetNoForecast} />
)

export const HighWind = () => <WeatherWidget widget={mockWeatherWidget} />
HighWind.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Clear', 22, true, 55),
      },
    ],
  },
}

export const Sunny = () => <WeatherWidget widget={mockWeatherWidget} />
Sunny.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Sunny', 72, true, 5),
      },
    ],
  },
}

export const Fog = () => <WeatherWidget widget={mockWeatherWidget} />
Fog.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Fog', 27, false, 5),
      },
    ],
  },
}

export const ClearNight = () => <WeatherWidget widget={mockWeatherWidget} />
ClearNight.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Clear', 27, false, 5),
      },
    ],
  },
}

export const Overcast = () => <WeatherWidget widget={mockWeatherWidget} />
Overcast.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Overcast', 38, false, 5),
      },
    ],
  },
}

export const PartlySunny = () => <WeatherWidget widget={mockWeatherWidget} />
PartlySunny.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Partly Sunny', 63, true, 5),
      },
    ],
  },
}

export const Showers = () => <WeatherWidget widget={mockWeatherWidget} />
Showers.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Showers', 53, true, 5),
      },
    ],
  },
}

export const Rain = () => <WeatherWidget widget={mockWeatherWidget} />
Rain.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Rain', 56, true, 5),
      },
    ],
  },
}

export const Thunderstorms = () => <WeatherWidget widget={mockWeatherWidget} />
Thunderstorms.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Thunderstorms', 51, true, 5),
      },
    ],
  },
}

export const Snow = () => <WeatherWidget widget={mockWeatherWidget} />
Snow.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Snow', 51, true, 5),
      },
    ],
  },
}

export const HighTemp = () => <WeatherWidget widget={mockWeatherWidget} />
HighTemp.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Hot', 111, true, 5),
      },
    ],
  },
}

export const LowTemp = () => <WeatherWidget widget={mockWeatherWidget} />
LowTemp.story = {
  parameters: {
    mockData: [
      {
        url: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        method: 'GET',
        status: 200,
        response: mockHourlyForecastFunc('Cold', 24, true, 5),
      },
    ],
  },
}
