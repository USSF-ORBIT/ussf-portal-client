import React from 'react'
import { useMySpaceContext } from 'stores/myspaceContext'
import WeatherWidget from 'components/WeatherWidget/WeatherWidget'

const TemporaryWidget = () => {
  const { temporaryWidget } = useMySpaceContext()

  if (temporaryWidget === 'Weather') {
    return <WeatherWidget />
  }

  return null
}

export default TemporaryWidget
