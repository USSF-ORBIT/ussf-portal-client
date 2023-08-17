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
import Widget from 'components/Widget/Widget'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'
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

  // WeatherWidget settings dropdown state
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

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
      updateModalId('removeWeatherWidgetModal')
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
    setIsAddingWidget(false)
    setIsEditing(false)
    setDisableDragAndDrop(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setIsDropdownOpen(false)
    setDisableDragAndDrop(true)
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const sanitizedInput = input.replace(/\D/g, '')
    setZipCode(sanitizedInput)
  }

  const now = DateTime.now()
  const currentDate = `${now.weekdayShort}, ${now.monthShort} ${now.day}`

  // Toggle the dropdown menu
  const menuOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const weatherWidgetHeader = () => {
    return (
      <>
        {widget.widget ? (
          <>
            <h3>Weather</h3>
            <DropdownMenu
              toggleEl={
                <button
                  type="button"
                  className={styles.dropdownMenuToggle}
                  onClick={menuOnClick}
                  aria-label={`Weather settings for ${widget.widget.coords.zipcode}`}>
                  <FontAwesomeIcon icon="cog" />
                </button>
              }
              dropdownRef={dropdownEl}
              align="right"
              isActive={isDropdownOpen}>
              <Button
                key="weatherWidgetSettingsMenu_edit"
                type="button"
                onClick={handleEdit}>
                Edit zip code
              </Button>
              <Button
                key="weatherWidgetSettingsMenu_remove"
                type="button"
                onClick={handleConfirmRemoveWidget}
                aria-label={`Remove weather widget for ${widget.widget.coords.zipcode}`}>
                Remove weather widget
              </Button>
            </DropdownMenu>
          </>
        ) : (
          <>
            <h3>Weather</h3>
            <DropdownMenu
              toggleEl={
                <button
                  type="button"
                  className={styles.dropdownMenuToggle}
                  onClick={menuOnClick}
                  aria-label="Weather settings">
                  <FontAwesomeIcon icon="cog" />
                </button>
              }
              dropdownRef={dropdownEl}
              align="right"
              isActive={isDropdownOpen}>
              <Button
                key="weatherWidgetSettingsMenu_remove"
                type="button"
                onClick={handleConfirmRemoveWidget}
                aria-label="Remove weather widget">
                Remove weather widget
              </Button>
            </DropdownMenu>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <Widget header={weatherWidgetHeader()}>
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
              data-testid="weatherWidget_input"
              maxLength={5}
              type="text"
              pattern="[0-9]{5}"
              onChange={handleZipCodeChange}
              value={zipCode}
              required
            />
            <ButtonGroup>
              <Button
                type="button"
                className={`padding-105 text-center ${styles.cancelButton}`}
                onClick={handleCancel}
                aria-label={`Cancel ${isAddingWidget ? 'adding' : 'editing'} ${
                  widget.widget
                    ? `${widget.widget.coords.zipcode}`
                    : 'weather widget'
                }`}>
                Cancel
              </Button>
              <Button type="submit" className={styles.saveButton}>
                Save zip code
              </Button>
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
                      aria-label={`Edit zip code for ${widget.widget.coords.zipcode}`}
                      onClick={() => setIsEditing(true)}>
                      {widget.widget.coords.zipcode}
                    </Button>
                  </div>
                )}
                <div className={styles.currentForecast}>
                  <div className={styles.icon}>
                    <WeatherWidgetIcon
                      hourlyPeriod={currentForecast[0]}
                      style={{ fontSize: '110px' }}
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
                          <h3>{h.temperature}&deg;</h3>
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
      </Widget>
    </>
  )
}

export default WeatherWidget
