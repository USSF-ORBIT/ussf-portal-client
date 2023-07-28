import React from 'react'
import { Button } from '@trussworks/react-uswds'
import { WidgetWithSettings } from 'components/Widget/Widget'

const WeatherWidget = () => {
  return (
    <>
      <WidgetWithSettings
        header="Weather"
        settingsItems={[
          <Button key="weatherWidgetSettingsMenu_remove" type="button">
            Remove Weather widget
          </Button>,
        ]}>
        <div>Content</div>
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
