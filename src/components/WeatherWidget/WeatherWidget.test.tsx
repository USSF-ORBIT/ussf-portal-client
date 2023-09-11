/**
 * @jest-environment jsdom
 */
import axios from 'axios'
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ObjectId } from 'mongodb'
import { renderWithMySpaceAndModalContext } from '../../testHelpers'
import { mockHourlyForecast } from '__fixtures__/data/hourlyForecast'
import WeatherWidget from './WeatherWidget'
import { WeatherWidget as WeatherWidgetType } from 'types'

const mockWeatherWidget: WeatherWidgetType = {
  _id: ObjectId(),
  type: 'Weather',
  title: 'Weather',
  coords: {
    lat: 34.0901,
    long: -118.4065,
    forecastUrl: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast',
    hourlyForecastUrl:
      'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
    city: 'Beverly Hills',
    state: 'CA',
    zipcode: '90210',
  },
}

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  mockedAxios.get.mockClear()
})

const mockWeatherWidgetWithIncorrectZipcode: WeatherWidgetType = {
  _id: ObjectId(),
  type: 'Weather',
  title: 'Weather',
  coords: {
    lat: 34.0901,
    long: -118.4065,
    forecastUrl: 'not_a_forecast_url',
    hourlyForecastUrl: 'not_an_hourly_url',
    city: 'Beverly Hills',
    state: 'CA',
    zipcode: '00000',
  },
}

describe('WeatherWidget', () => {
  mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: mockHourlyForecast })
  })

  test('renders the WeatherWidget component', async () => {
    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidget widget={mockWeatherWidget} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument()
      expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument()
      // this date is hardcoded in the fixture
      expect(screen.getByText('Wed, Aug 16')).toBeInTheDocument()
      expect(screen.getByText('74°')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidget component in edit mode when there is no widget', async () => {
    const user = userEvent.setup()
    const mockSetIsAddingWidget = jest.fn()
    const mockAddNewWeatherWidget = jest.fn()

    renderWithMySpaceAndModalContext(<WeatherWidget />, {
      isAddingWidget: true,
      setIsAddingWidget: mockSetIsAddingWidget,
      addNewWeatherWidget: mockAddNewWeatherWidget,
    })

    await waitFor(() => {
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })

    // Enter a zip code
    await user.type(screen.getByTestId('weatherWidget_input'), '90210')

    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('90210')

    // Click the submit button
    await user.click(screen.getByRole('button', { name: 'Save zip code' }))

    await waitFor(() => {
      expect(mockAddNewWeatherWidget).toHaveBeenCalledWith('90210')
      expect(mockSetIsAddingWidget).toHaveBeenCalledWith(false)
    })
  })

  test('edit the WeatherWidget', async () => {
    const user = userEvent.setup()
    const mockEditWeatherWidget = jest.fn()

    renderWithMySpaceAndModalContext(
      <WeatherWidget widget={mockWeatherWidget} />,
      {
        editWeatherWidget: mockEditWeatherWidget,
      }
    )

    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument()
      expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument()
    })

    // Click the edit button
    expect(
      screen.getByLabelText('Weather settings for Beverly Hills, CA')
    ).toBeInTheDocument()
    await user.click(
      screen.getByLabelText('Weather settings for Beverly Hills, CA')
    )

    expect(screen.getByText('Edit zip code')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit zip code' }))
    await waitFor(() => {
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })

    // Enter a zip code
    await user.type(screen.getByTestId('weatherWidget_input'), '85202')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('85202')

    // Click the submit button
    expect(
      screen.getByRole('button', { name: 'Save zip code' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Save zip code' }))
    await waitFor(() => {
      expect(mockEditWeatherWidget).toHaveBeenCalled()
    })
  })

  test('edit the WeatherWidget with the inline edit and cancel', async () => {
    const user = userEvent.setup()
    const mockSetIsAddingWidget = jest.fn()

    renderWithMySpaceAndModalContext(
      <WeatherWidget widget={mockWeatherWidget} />,
      {
        setIsAddingWidget: mockSetIsAddingWidget,
      }
    )

    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument()
      expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument()
    })

    // Click the edit button
    expect(
      screen.getByLabelText('Edit zip code for Beverly Hills, CA')
    ).toBeInTheDocument()
    await user.click(
      screen.getByLabelText('Edit zip code for Beverly Hills, CA')
    )

    await waitFor(() => {
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })

    // Enter a zip code
    await user.type(screen.getByTestId('weatherWidget_input'), '85202')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('85202')

    // Cancel
    expect(
      screen.getByRole('button', {
        name: 'Cancel editing Beverly Hills, CA',
      })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Cancel editing Beverly Hills, CA' })
    )

    await waitFor(() => {
      expect(mockSetIsAddingWidget).toHaveBeenCalledWith(false)
    })
  })

  test('user can only enter a 5 digit zip code', async () => {
    const user = userEvent.setup()
    const mockSetIsAddingWidget = jest.fn()
    const mockAddNewWeatherWidget = jest.fn()

    renderWithMySpaceAndModalContext(<WeatherWidget />, {
      isAddingWidget: true,
      setIsAddingWidget: mockSetIsAddingWidget,
      addNewWeatherWidget: mockAddNewWeatherWidget,
    })

    await waitFor(() => {
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })

    // Enter a zip code
    await user.type(screen.getByTestId('weatherWidget_input'), '90210')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('90210')

    // Enter a zip code with more than 5 digits
    await user.type(screen.getByTestId('weatherWidget_input'), '123456')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('90210')

    // Attempt to enter letters and special characters
    await user.type(screen.getByTestId('weatherWidget_input'), 'abcde')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('90210')

    await user.type(screen.getByTestId('weatherWidget_input'), '!')
    expect(screen.getByTestId('weatherWidget_input')).toHaveValue('90210')
  })

  test('user can retry fetching the weather forecast', async () => {
    const user = userEvent.setup()
    const mockConsoleError = jest.fn()
    jest.spyOn(console, 'error').mockImplementation(mockConsoleError)

    renderWithMySpaceAndModalContext(
      <WeatherWidget widget={mockWeatherWidgetWithIncorrectZipcode} />
    )

    // Click the retry button
    await waitFor(() => {
      expect(
        screen.getByLabelText('Retry fetching weather')
      ).toBeInTheDocument()
    })
    await user.click(screen.getByLabelText('Retry fetching weather'))

    // Since the mock widget that is being used has an invalid url, we expect the request to fail. Checking
    // that there is an error logged to the console is important because it means that, when the Retry
    // button was clicked, the request was made in the useWeather hook and failed.
    expect(mockConsoleError).toHaveBeenCalledWith('Network Error')
  })

  test('remove the WeatherWidget', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()
    const mockSetDisableDragAndDrop = jest.fn()

    renderWithMySpaceAndModalContext(
      <WeatherWidget widget={mockWeatherWidget} />,
      {
        isAddingWidget: false,
        setDisableDragAndDrop: mockSetDisableDragAndDrop,
      },
      [],
      {},
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
      }
    )

    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument()
      expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument()
    })

    // Remove the widget
    expect(
      screen.getByLabelText('Weather settings for Beverly Hills, CA')
    ).toBeInTheDocument()
    await user.click(
      screen.getByLabelText('Weather settings for Beverly Hills, CA')
    )

    expect(
      screen.getByLabelText('Remove weather widget for Beverly Hills, CA')
    ).toBeInTheDocument()
    await user.click(
      screen.getByLabelText('Remove weather widget for Beverly Hills, CA')
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith('removeWeatherWidgetModal')
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
    expect(mockSetDisableDragAndDrop).toHaveBeenCalledWith(false)
  })

  test('remove temporary WeatherWidget', async () => {
    const user = userEvent.setup()
    const mockSetDisableDragAndDrop = jest.fn()

    renderWithMySpaceAndModalContext(<WeatherWidget />, {
      isAddingWidget: true,
      setDisableDragAndDrop: mockSetDisableDragAndDrop,
    })

    await waitFor(() => {
      expect(
        screen.getByText('Search by five-digit ZIP code (US only)')
      ).toBeInTheDocument()
    })

    expect(screen.getByLabelText('Weather settings')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Weather settings'))

    expect(screen.getByLabelText('Remove weather widget')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Remove weather widget'))

    expect(mockSetDisableDragAndDrop).toHaveBeenCalledWith(false)
  })
})
