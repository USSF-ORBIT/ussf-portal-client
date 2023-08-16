import { useState } from 'react'
import axios from 'axios'

export const useWeather = (): {
  //#TODO Once we know what data we're getting back from the API
  // for the front-end, we can type this
  forecast: any[]
  getForecast: (forecastUrl: string) => void
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
