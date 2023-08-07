import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import { DateTime } from 'luxon'
import styles from './WeatherWidget.module.scss'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { useWeather } from 'hooks/useWeather'
import { useModalContext } from 'stores/modalContext'
import { useMySpaceContext } from 'stores/myspaceContext'
import { WeatherWidget as Widget } from 'types'

// widget needs to be optional because we are using WeatherWidget in TemporaryWidget,
// where widget is undefined while the user is providing the zip code for the widget.
type WeatherWidgetProps = {
  widget?: Widget
}

const WeatherWidget = (widget: WeatherWidgetProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const { forecast, getForecast } = useWeather()
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const {
    addNewWeatherWidget,
    editWeatherWidget,
    isAddingWidget,
    setIsAddingWidget,
  } = useMySpaceContext()

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (widget.widget) {
      getForecast(widget.widget.coords.hourlyForecastUrl)
    }
  }, [])

  const currentForecast = forecast.slice(0, 5)

  /** Remove widget */
  // Show confirmation modal
  const handleConfirmRemoveWidget = () => {
    if (isAddingWidget && !widget.widget) {
      setIsAddingWidget(false)
    }

    if (!isAddingWidget && widget.widget) {
      updateModalId('removeNewsWidgetModal')
      updateModalText({
        headingText: 'Are you sure you’d like to delete this widget?',
        descriptionText:
          'You can re-add it to your My Space from the Add Widget menu.',
      })

      const widgetState: Widget = {
        _id: widget.widget._id,
        title: widget.widget.title,
        type: 'Weather',
        coords: widget.widget.coords,
      }

      updateWidget(widgetState)

      modalRef?.current?.toggleModal(undefined, true)
    }
  }

  const inputId = widget.widget
    ? `weatherWidget_${widget.widget._id}`
    : 'weatherWidget_temporary'

  // Move to MySpaceContext?
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const inputVal = `${data.get('weatherWidget_input')}`

    // if we are editing an existing widget
    // disable drag and drop

    // if we are adding a new widget
    if (isAddingWidget && !widget.widget) {
      addNewWeatherWidget(inputVal.toString())
      setIsAddingWidget(false)
    }
    // setDisableDragAndDrop(false)
  }

  const handleCancel = () => {
    // Edge case: what if someone is adding another widget while editing this widget? Might need to add a
    // conditional here.
    setIsAddingWidget(false)
    setIsEditing(false)
  }

  const now = DateTime.now()
  const currentDate = `${now.weekdayLong}, ${now.monthLong} ${now.day}`

  return (
    <>
      <WidgetWithSettings
        header="Weather"
        settingsItems={[
          <Button
            key="weatherWidgetSettingsMenu_remove"
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmRemoveWidget}>
            Remove Weather Widget
          </Button>,
        ]}>
        {isAddingWidget || isEditing ? (
          <Form
            onSubmit={handleSubmit}
            className={styles.editableWeatherWidget}>
            <Label htmlFor={inputId}>
              Search by five-digit ZIP code (US only)
            </Label>
            <TextInput
              inputRef={inputRef}
              id={inputId}
              name="weatherWidget_input"
              required
              maxLength={200}
              className={styles.collectionTitle}
              type="number"
            />
            <ButtonGroup>
              <Button
                type="button"
                className={`padding-105 text-center ${styles.cancelButton}`}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save zip code</Button>
            </ButtonGroup>
          </Form>
        ) : null}

        {widget.widget && !isAddingWidget && !isEditing && (
          <>
            {/* Change this to a ternary and show a loading state? */}
            {currentForecast[0] && (
              <div>
                {widget.widget?.coords && <p>{widget.widget.coords.zipcode}</p>}
                <div className={styles.currentForecast}>
                  <div>
                    <img
                      src={currentForecast[0].icon}
                      alt={currentForecast[0].shortForecast}
                    />
                  </div>

                  <div>
                    <p>{currentForecast[0].temperature}</p>
                    <p>{currentForecast[0].shortForecast}</p>
                    <p>{currentDate}</p>
                  </div>
                </div>

                <p>Hourly Forecast</p>
                <div className={styles.hourlyForecast}>
                  {currentForecast.map((h, index) => {
                    if (index >= 1) {
                      const date = DateTime.fromISO(h.startTime)
                      return (
                        <div key={h.number}>
                          <div>
                            <img src={h.icon} alt={h.shortForecast} />
                          </div>
                          <div>{h.temperature}&deg;</div>
                          <div>{date.toFormat('T')}</div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
