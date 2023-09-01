import React, { useState, useEffect } from 'react'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

type HourlyPeriod = {
  windSpeed: number
  isDaytime: boolean
  shortForecast: string
  temperature: number
}

type WeatherWidgetIconProps = {
  hourlyPeriod: HourlyPeriod
  iconSize?: FontAwesomeIconProps['size']
  style?: React.CSSProperties
}

const WeatherWidgetIcon = ({
  hourlyPeriod,
  iconSize,
  ...props
}: WeatherWidgetIconProps) => {
  const [chosenIcon, setChosenIcon] =
    useState<FontAwesomeIconProps['icon']>('sun')

  useEffect(() => {
    if (hourlyPeriod.windSpeed >= 15) {
      setChosenIcon('wind')
      return
    }

    // Daytime icons
    if (hourlyPeriod.isDaytime) {
      const shortForecast = hourlyPeriod.shortForecast.toLowerCase()

      if (shortForecast.includes('partly sunny')) {
        setChosenIcon('cloud-sun')
        return
      }

      if (shortForecast.includes('sunny')) {
        setChosenIcon('sun')
        return
      }

      if (
        shortForecast.includes('cloudy') ||
        shortForecast.includes('overcast')
      ) {
        setChosenIcon('cloud')
        return
      }

      if (shortForecast.includes('thunderstorms')) {
        setChosenIcon('bolt-lightning')
        return
      }

      if (shortForecast.includes('rain')) {
        setChosenIcon('cloud-rain')
        return
      }

      if (shortForecast.includes('showers')) {
        setChosenIcon('cloud-showers-heavy')
        return
      }

      if (shortForecast.includes('snow')) {
        setChosenIcon('snowflake')
        return
      }

      if (shortForecast.includes('fog')) {
        setChosenIcon('smog')
        return
      }

      if (hourlyPeriod.temperature >= 80) {
        setChosenIcon('temperature-high')
        return
      }

      if (hourlyPeriod.temperature <= 60) {
        setChosenIcon('temperature-low')
        return
      }

      setChosenIcon('sun')
    }

    // Nighttime icons
    if (!hourlyPeriod.isDaytime) {
      const shortForecast = hourlyPeriod.shortForecast.toLowerCase()

      if (shortForecast.includes('clear')) {
        setChosenIcon('moon')
        return
      }

      if (
        shortForecast.includes('cloudy') ||
        shortForecast.includes('overcast')
      ) {
        setChosenIcon('cloud')
        return
      }

      if (shortForecast.includes('thunderstorms')) {
        setChosenIcon('bolt-lightning')
        return
      }

      if (shortForecast.includes('rain')) {
        setChosenIcon('cloud-rain')
        return
      }

      if (shortForecast.includes('showers')) {
        setChosenIcon('cloud-showers-heavy')
        return
      }

      if (shortForecast.includes('snow')) {
        setChosenIcon('snowflake')
        return
      }

      if (shortForecast.includes('fog')) {
        setChosenIcon('smog')
        return
      }

      if (hourlyPeriod.temperature >= 80) {
        setChosenIcon('temperature-high')
        return
      }

      if (hourlyPeriod.temperature <= 60) {
        setChosenIcon('temperature-low')
        return
      }

      setChosenIcon('moon')
    }
  }, [hourlyPeriod])

  return (
    <FontAwesomeIcon
      icon={chosenIcon}
      size={iconSize ? iconSize : undefined}
      aria-label={`Icon for ${chosenIcon}`}
      {...props}
    />
  )
}

export default WeatherWidgetIcon
