import React, { useEffect, useRef } from 'react'
import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
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
  // const { forecast, getForecast } = useWeather()
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()

  const { editWeatherWidget, isAddingWidget, setIsAddingWidget } =
    useMySpaceContext()

  const inputRef = useRef<HTMLInputElement>(null)
  // useEffect(() => {
  //   getForecast(widget.widget.coords.hourlyForecastUrl)
  // }, [])

  // const currentForecast = forecast.slice(0, 5)

  /** Remove widget */
  // Show confirmation modal
  const handleConfirmRemoveWidget = () => {
    if (isAddingWidget && !widget.widget) {
      setIsAddingWidget(false)
    }

    // updateModalId('removeNewsWidgetModal')
    // updateModalText({
    //   headingText: 'Are you sure you’d like to delete this widget?',
    //   descriptionText:
    //     'You can re-add it to your My Space from the Add Widget menu.',
    // })

    // const widgetState: Widget = {
    //   _id: widget.widget._id,
    //   title: widget.widget.title,
    //   type: 'Weather',
    //   coords: widget.widget.coords,
    // }

    // updateWidget(widgetState)

    // modalRef?.current?.toggleModal(undefined, true)
  }

  const inputId = widget.widget
    ? `weatherWidget_${widget.widget._id}`
    : 'weatherWidget_temporary'

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const inputVal = `${data.get('weatherWidget_input')}`
    // onSave(label)
    // setDisableDragAndDrop(false)
  }

  return (
    <>
      <WidgetWithSettings
        className={styles.newsWidget}
        header="Weather"
        settingsItems={[
          <Button
            key="newsWidgetSettingsMenu_remove"
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmRemoveWidget}>
            Remove Weather Widget
          </Button>,
        ]}>
        <Form
          onSubmit={handleSubmitEdit}
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
            // defaultValue={text}
            type="number"
          />
          <ButtonGroup>
            <Button
              type="button"
              className={`padding-105 text-center ${styles.cancelButton}`}
              onClick={() => setIsAddingWidget(false)}>
              Cancel
            </Button>
            <Button type="submit">Save name</Button>
          </ButtonGroup>
        </Form>
        {/* <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={() => {
            editWeatherWidget({
              ...widget.widget,
              title: Date.now().toString(),
            })
          }}>
          Edit Weather Widget
        </Button> */}
        {/* {currentForecast.map((h) => {
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
        })} */}
      </WidgetWithSettings>
    </>
  )
}

export default WeatherWidget
