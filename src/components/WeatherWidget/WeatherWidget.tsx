import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import styles from './WeatherWidget.module.scss'
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

  const now = DateTime.now()
  const currentDate = `${now.weekdayLong}, ${now.monthLong} ${now.day}`

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

  const iconLogic = (
    hourlyPeriod: any,
    iconSize: FontAwesomeIconProps['size']
  ): JSX.Element => {
    if (hourlyPeriod.windSpeed >= 15) {
      return <FontAwesomeIcon icon="wind" size={iconSize} />
    }

    // Daytime icons
    if (hourlyPeriod.isDaytime) {
      const shortForecast = hourlyPeriod.shortForecast.toLowerCase()
      if (shortForecast.includes('sunny')) {
        return <FontAwesomeIcon icon="sun" size={iconSize} />
      }

      if (shortForecast.includes('partly sunny')) {
        return <FontAwesomeIcon icon="cloud-sun" size={iconSize} />
      }

      if (shortForecast.includes('cloudy')) {
        return <FontAwesomeIcon icon="cloud" size={iconSize} />
      }

      if (shortForecast.includes('thunderstorms')) {
        return <FontAwesomeIcon icon="bolt-lightning" size={iconSize} />
      }

      if (shortForecast.includes('rain')) {
        return <FontAwesomeIcon icon="cloud-rain" size={iconSize} />
      }

      if (shortForecast.includes('showers')) {
        return <FontAwesomeIcon icon="cloud-showers-heavy" size={iconSize} />
      }

      if (shortForecast.includes('snow')) {
        return <FontAwesomeIcon icon="snowflake" size={iconSize} />
      }

      if (shortForecast.includes('fog')) {
        return <FontAwesomeIcon icon="smog" size={iconSize} />
      }

      if (hourlyPeriod.temperature >= 80) {
        return <FontAwesomeIcon icon="temperature-high" size={iconSize} />
      }

      if (hourlyPeriod.temperature <= 60) {
        return <FontAwesomeIcon icon="temperature-low" size={iconSize} />
      }
      // Nighttime icons
    } else if (!hourlyPeriod.isDaytime) {
      const shortForecast = hourlyPeriod.shortForecast.toLowerCase()
      if (shortForecast.includes('clear')) {
        return <FontAwesomeIcon icon="moon" size={iconSize} />
      }

      if (shortForecast.includes('cloudy')) {
        return <FontAwesomeIcon icon="cloud" size={iconSize} />
      }

      if (shortForecast.includes('thunderstorms')) {
        return <FontAwesomeIcon icon="bolt-lightning" size={iconSize} />
      }

      if (shortForecast.includes('rain')) {
        return <FontAwesomeIcon icon="cloud-rain" size={iconSize} />
      }

      if (shortForecast.includes('showers')) {
        return <FontAwesomeIcon icon="cloud-showers-heavy" size={iconSize} />
      }

      if (shortForecast.includes('snow')) {
        return <FontAwesomeIcon icon="snowflake" size={iconSize} />
      }

      if (shortForecast.includes('fog')) {
        return <FontAwesomeIcon icon="smog" size={iconSize} />
      }

      if (hourlyPeriod.temperature >= 80) {
        return <FontAwesomeIcon icon="temperature-high" size={iconSize} />
      }

      if (hourlyPeriod.temperature <= 60) {
        return <FontAwesomeIcon icon="temperature-low" size={iconSize} />
      }
    }

    return <></>
  }

  return (
    <>
      <WidgetWithSettings
        header="Weather"
        settingsItems={[...weatherWidgetSettings()]}>
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
            {currentForecast[0] && (
              <div>
                {widget.widget?.coords && <p>{widget.widget.coords.zipcode}</p>}
                <div className={styles.currentForecast}>
                  <div>{iconLogic(currentForecast[0], '2xl')}</div>

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
                          <div>{iconLogic(h, 'xl')}</div>
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
