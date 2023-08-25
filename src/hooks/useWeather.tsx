import { useState } from 'react'
import axios from 'axios'

export const useWeather = (): {
  //#TODO Once we know what data we're getting back from the API
  // for the front-end, we can type this
  forecast: any[]
  getForecast: (forecastUrl: string) => void
  error: string | null
} => {
  const [forecast, setForecast] = useState<any[]>([])
  const [error, setError] = useState<any>(null)

  const getForecast = async (forecastUrl: string) => {
    try {
      const forecastHourly = await axios.get(forecastUrl)
      setForecast(forecastHourly.data.properties.periods)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return {
    forecast,
    getForecast,
    error,
  }
}
