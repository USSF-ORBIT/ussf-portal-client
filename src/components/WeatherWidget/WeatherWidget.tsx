import React, { useEffect } from 'react'
import { Button } from '@trussworks/react-uswds'
import styles from '../NewsWidget/NewsWidget.module.scss'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { useWeather } from 'hooks/useWeather'
import { useModalContext } from 'stores/modalContext'
import { WeatherWidget as WeatherWidgetType } from 'graphql.g'
import { WidgetType } from 'graphql.g'
import { useMySpaceContext } from 'stores/myspaceContext'

const WeatherWidget = (widget: any) => {
  const { forecast, getForecast } = useWeather()
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const { editWeatherWidget } = useMySpaceContext()

  useEffect(() => {
    getForecast(widget.widget.coords.hourlyForecastUrl)
  }, [widget])

  const currentForecast = forecast.slice(0, 5)

  /** Remove widget */
  // Show confirmation modal
  const handleConfirmRemoveWidget = () => {
    updateModalId('removeNewsWidgetModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })

    const widgetState: WeatherWidgetType = {
      _id: widget.widget._id,
      title: widget.widget.title,
      type: WidgetType.Weather,
      coords: widget.widget.coords,
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }
  return (
    <>
      <WidgetWithSettings
        className={styles.newsWidget}
        header={`${widget.widget.title}`}
        settingsItems={[
          <Button
            key="newsWidgetSettingsMenu_remove"
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmRemoveWidget}>
            Remove Weather Widget
          </Button>,
        ]}>
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={() => {
            editWeatherWidget({
              _id: widget.widget._id,
              zipcode: '90210',
            })
          }}>
          Edit Weather Widget
        </Button>
        {currentForecast.map((h) => {
          return (
            <div key={h.number}>
              <div>
                {h.startTime}
                {h.name}
              </div>
              <div>
                <img src={h.icon} alt={h.shortForecast} />
                <p>{h.shortForecast}</p>
              </div>
              <div>{h.temperature}&deg;</div>
            </div>
          )
        })}
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
