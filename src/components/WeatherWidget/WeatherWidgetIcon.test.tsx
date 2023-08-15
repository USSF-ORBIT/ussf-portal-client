/**
 * @jest-environment jsdom
 */
import { act, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { renderWithMySpaceAndModalContext } from '../../testHelpers'
import WeatherWidgetIcon from './WeatherWidgetIcon'

describe('WeatherWidgetIcon', () => {
  test('renders the WeatherWidgetIcon component', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Sunny',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for sun')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a wind icon when wind speed is greater than 15', async () => {
    const mockHourlyPeriod = {
      windSpeed: 20,
      isDaytime: true,
      shortForecast: 'Sunny',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for wind')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a sun icon when shortForecast includes "sunny"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Sunny',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for sun')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud-sun icon when shortForecast includes "partly sunny"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Partly Sunny',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for cloud-sun')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud icon when shortForecast includes "cloudy"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Cloudy',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for cloud')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a bolt-lightning icon when shortForecast includes "thunderstorms"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Thunderstorms',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for bolt-lightning')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud-rain icon when shortForecast includes "rain"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Rain',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for cloud-rain')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud-showers-heavy icon when shortForecast includes "showers"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Showers',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for cloud-showers-heavy')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a snowflake icon when shortForecast includes "snow"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Snow',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for snowflake')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a smog icon when shortForecast includes "fog"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: 'Fog',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for smog')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a temperature-high icon when temp is at least 80', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: '',
      temperature: 80,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for temperature-high')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a temperature-low icon when temp is 60 or less', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: '',
      temperature: 59,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for temperature-low')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a sun icon when shortForecast is empty/unknown', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: true,
      shortForecast: '',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for sun')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a moon icon when isDaytime is false', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Clear',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for moon')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud icon when isDaytime is false and shortForecast includes "cloudy"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Cloudy',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for cloud')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a bolt-lightning icon when isDaytime is false and shortForecast includes "thunderstorms"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Thunderstorms',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for bolt-lightning')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud-rain icon when isDaytime is false and shortForecast includes "rain"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Rain',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for cloud-rain')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a cloud-showers-heavy icon when isDaytime is false and shortForecast includes "showers"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Showers',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for cloud-showers-heavy')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a snowflake icon when isDaytime is false and shortForecast includes "snow"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Snow',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for snowflake')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a smog icon when isDaytime is false and shortForecast includes "fog"', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: 'Fog',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for smog')).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a temperature-high icon when isDaytime is false and temp is at least 80', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: '',
      temperature: 80,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for temperature-high')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a temperature-low icon when isDaytime is false and temp is 60 or less', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: '',
      temperature: 60,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} iconSize="2xl" />,
        {}
      )
    })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Icon for temperature-low')
      ).toBeInTheDocument()
    })
  })

  test('renders the WeatherWidgetIcon component with a moon icon when isDaytime is false and shortForecast is empty/unknown', async () => {
    const mockHourlyPeriod = {
      windSpeed: 0,
      isDaytime: false,
      shortForecast: '',
      temperature: 70,
    }

    await act(async () => {
      renderWithMySpaceAndModalContext(
        <WeatherWidgetIcon hourlyPeriod={mockHourlyPeriod} />,
        {}
      )
    })

    await waitFor(() => {
      expect(screen.getByLabelText('Icon for moon')).toBeInTheDocument()
    })
  })
})
