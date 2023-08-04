// Weather widgets
import { WeatherWidget, WidgetType } from '../../graphql.g'
import { ObjectId } from 'mongodb'

export const exampleWeatherWidget1: WeatherWidget = {
  _id: ObjectId(),
  title: 'Weather',
  type: WidgetType.Weather,
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
export const exampleWeatherWidget2: WeatherWidget = {
  _id: ObjectId(),
  title: 'Weather',
  type: WidgetType.Weather,
  coords: {
    lat: 54.143,
    long: -165.7854,
    forecastUrl: 'https://api.weather.gov/gridpoints/ALU/509,77/forecast',
    hourlyForecastUrl:
      'https://api.weather.gov/gridpoints/ALU/509,77/forecast/hourly',
    city: 'Akutan',
    state: 'AK',
    zipcode: '99553',
  },
}

export const WeatherAPIMockData = {
  forecast: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast',
  forecastHourly:
    'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
  forecastGridData: 'https://api.weather.gov/gridpoints/LOX/149,48',

  relativeLocation: {
    properties: {
      city: 'Beverly Hills',
      state: 'CA',
    },
  },
}

export const KeystoneAPIMockData = {
  data: {
    zipcode: {
      latitude: 34.0901,
      longitude: -118.4065,
    },
  },
}
