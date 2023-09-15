import { useState } from 'react'
import axios from 'axios'

export const useWeather = (): {
  //#TODO Once we know what data we're getting back from the API
  // for the front-end, we can type this
  forecast: any[]
  getForecast: (forecastUrl: string) => void
  forecastError: string | null
  resetForecastError: () => void
} => {
  const [forecast, setForecast] = useState<any[]>([])
  const [forecastError, setError] = useState<any>(null)

  const getForecast = async (forecastUrl: string) => {
    try {
      const forecastHourly = await axios.get(forecastUrl)
      setForecast(forecastHourly.data.properties.periods)
    } catch (error: any) {
      setError(error.message)
      console.error(error.message)
    }
  }

  const resetForecastError = () => {
    setError(null)
  }

  return {
    forecast,
    getForecast,
    forecastError,
    resetForecastError,
  }
}
