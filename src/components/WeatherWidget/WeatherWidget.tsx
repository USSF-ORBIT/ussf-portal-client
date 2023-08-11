import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import styles from './WeatherWidget.module.scss'
import WeatherWidgetIcon from './WeatherWidgetIcon'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { useWeather } from 'hooks/useWeather'
import { useModalContext } from 'stores/modalContext'
import { useMySpaceContext } from 'stores/myspaceContext'
import { WeatherWidget as WeatherWidgetType } from 'types'

// widget needs to be optional because we are using WeatherWidget in TemporaryWidget,
// where widget is undefined while the user is providing the zip code for the widget.
type WeatherWidgetProps = {
  widget?: WeatherWidgetType
}

const WeatherWidget = (widget: WeatherWidgetProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [zipCode, setZipCode] = useState<string>('')

  const { forecast, getForecast } = useWeather()
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const {
    addNewWeatherWidget,
    editWeatherWidget,
    isAddingWidget,
    setIsAddingWidget,
    setDisableDragAndDrop,
  } = useMySpaceContext()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (widget.widget) {
      getForecast(widget.widget.coords.hourlyForecastUrl)
    }
  }, [widget.widget])

  useEffect(() => {
    if (isAddingWidget || isEditing) {
      inputRef?.current?.focus()
    }
  }, [isAddingWidget, isEditing])

  const currentForecast = forecast.slice(0, 5)

  const inputId = widget.widget
    ? `weatherWidget_${widget.widget._id}`
    : 'weatherWidget_temporary'

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

      const widgetState: WeatherWidgetType = {
        _id: widget.widget._id,
        title: widget.widget.title,
        type: 'Weather',
        coords: widget.widget.coords,
      }

      updateWidget(widgetState)

      modalRef?.current?.toggleModal(undefined, true)
    }

    setDisableDragAndDrop(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const inputVal = `${data.get('weatherWidget_input')}`

    if (isAddingWidget && !widget.widget) {
      addNewWeatherWidget(inputVal.toString())
      setIsAddingWidget(false)
    }

    if (isEditing && widget.widget) {
      setIsEditing(false)
      editWeatherWidget({
        _id: widget.widget._id.toString(),
        zipcode: inputVal.toString(),
      })
    }

    setDisableDragAndDrop(false)
  }

  const handleCancel = () => {
    // Edge case: what if someone is adding another widget while editing this widget? Might need to add a
    // conditional here.
    setIsAddingWidget(false)
    setIsEditing(false)
    setDisableDragAndDrop(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setDisableDragAndDrop(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key

    // Allow only digits (0-9)
    if (!/^\d$/.test(keyCode)) {
      e.preventDefault()
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const sanitizedInput = input.replace(/\D/g, '')

    if (sanitizedInput.length <= 5) {
      setZipCode(e.target.value)
    }
  }

  const now = DateTime.now()
  const currentDate = `${now.weekdayShort}, ${now.monthShort} ${now.day}`

  const weatherWidgetSettings = () => {
    if (widget.widget) {
      return [
        <Button
          key="weatherWidgetSettingsMenu_edit"
          type="button"
          onClick={handleEdit}>
          Edit zip code
        </Button>,
        <Button
          key="weatherWidgetSettingsMenu_remove"
          type="button"
          onClick={handleConfirmRemoveWidget}>
          Remove Weather Widget
        </Button>,
      ]
    } else {
      return [
        <Button
          key="weatherWidgetSettingsMenu_remove"
          type="button"
          onClick={handleConfirmRemoveWidget}>
          Remove Weather Widget
        </Button>,
      ]
    }
  }

  return (
    <>
      <WidgetWithSettings
        header="Weather"
        settingsItems={[...weatherWidgetSettings()]}>
        {!widget.widget || isEditing ? (
          <Form
            onSubmit={handleSubmit}
            className={styles.editableWeatherWidget}>
            <Label htmlFor={inputId}>
              Search by five-digit ZIP code (US only)
            </Label>
            <TextInput
              inputRef={inputRef}
              id={inputId}
              className={styles.collectionTitle}
              name="weatherWidget_input"
              maxLength={5}
              type="text"
              onChange={handleZipCodeChange}
              onKeyDown={handleKeyPress}
              value={zipCode}
              required
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

        {widget.widget && !isEditing && (
          <>
            {currentForecast[0] && (
              <>
                {widget.widget?.coords && (
                  <div className={styles.location}>
                    <FontAwesomeIcon icon="map-marker-alt" size="lg" />
                    <Button
                      type="button"
                      unstyled
                      onClick={() => setIsEditing(true)}>
                      {widget.widget.coords.zipcode}
                    </Button>
                  </div>
                )}
                <div className={styles.currentForecast}>
                  <div className={styles.icon}>
                    <WeatherWidgetIcon
                      hourlyPeriod={currentForecast[0]}
                      style={{ fontSize: '70px' }}
                    />
                  </div>

                  <div className={styles.shortForecast}>
                    <h1>{currentForecast[0].temperature}&deg;</h1>
                    <p>{currentForecast[0].shortForecast}</p>
                    <p>{currentDate}</p>
                  </div>
                </div>

                <h5>Hourly Forecast</h5>
                <div className={styles.hourlyForecast}>
                  {currentForecast.map((h, index) => {
                    if (index >= 1) {
                      const date = DateTime.fromISO(h.startTime)
                      return (
                        <div key={h.number} className={styles.nextFourHours}>
                          <WeatherWidgetIcon hourlyPeriod={h} iconSize="2xl" />
                          <h2>{h.temperature}&deg;</h2>
                          <div>{date.toFormat('T')}</div>
                        </div>
                      )
                    }
                  })}
                </div>
              </>
            )}
          </>
        )}
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
