import { useState } from 'react'
import axios from 'axios'

export const useWeather = (): {
  forecast: any[]
  getForecast: (forecastUrl: string) => any
} => {
  const [forecast, setForecast] = useState<any[]>([])

  const getForecast = async (forecastUrl: string) => {
    const forecastHourly = await axios.get(forecastUrl)
    setForecast(forecastHourly.data.properties.periods)
  }

  return {
    forecast,
    getForecast,
  }
}
