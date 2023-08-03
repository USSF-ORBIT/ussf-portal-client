import React from 'react'
import { useMySpaceContext } from 'stores/myspaceContext'
import Widget from 'components/Widget/Widget'

const TemporaryWidget = () => {
  const { temporaryWidget } = useMySpaceContext()

  if (temporaryWidget === 'Weather') {
    return (
      <Widget>
        <p>Weather Widget goes here</p>
      </Widget>
    )
  }

  return null
}

export default TemporaryWidget
