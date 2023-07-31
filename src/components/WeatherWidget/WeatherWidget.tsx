import React, { useState } from 'react'
import { Button } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './WeatherWidget.module.scss'
import { WidgetWithSettings } from 'components/Widget/Widget'

const WeatherWidget = () => {
  const [zipCode] = useState(true)

  return (
    <>
      <WidgetWithSettings
        header="Weather"
        settingsItems={[
          <Button key="weatherWidgetSettingsMenu_remove" type="button">
            Remove Weather widget
          </Button>,
        ]}>
        {zipCode ? (
          <div>
            <div className={styles.locationContainer}>
              <FontAwesomeIcon icon="location-dot" />
              <p>Current location</p>
            </div>

            <div className={styles.weatherContainer}>
              {/* Icon */}
              <p>Icon</p>

              {/* Weather Summary */}
              <p>Summary</p>

              {/* Hourly Forecast */}
              <p>Hourly Forecast</p>
            </div>
          </div>
        ) : (
          <div className={styles.inputContainer}>
            <input
              type="text"
              className="usa-input"
              placeholder="Search by zip code"
            />
            <Button type="submit">Submit</Button>
          </div>
        )}
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
