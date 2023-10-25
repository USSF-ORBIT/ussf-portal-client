import { useState } from 'react'
import axios from 'axios'

type WeatherObject = {
  detailedForecast: string
  dewpoint: {
    unitCode: string
    value: number
  }
  endTime: string
  icon: string
  isDaytime: boolean
  name: string
  number: number
  probabilityOfPrecipitation: {
    unitCode: string
    value: number
  }
  relativeHumidity: {
    unitCode: string
    value: number
  }
  shortForecast: string
  startTime: string
  temperature: number
  temperatureTrend: null
  temperatureUnit: string
  windDirection: string
  windSpeed: string
}

export const useWeather = (): {
  forecast: WeatherObject[]
  getForecast: (forecastUrl: string) => void
  forecastError: string | null
  resetForecastError: () => void
} => {
  const [forecast, setForecast] = useState([])
  const [forecastError, setError] = useState('')

  const getForecast = async (forecastUrl: string) => {
    try {
      const forecastHourly = await axios.get(forecastUrl)
      setForecast(forecastHourly.data.properties.periods)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
        console.error(error.message)
      }
    }
  }

  const resetForecastError = () => {
    setError('')
  }

  return {
    forecast,
    getForecast,
    forecastError,
    resetForecastError,
  }
}
