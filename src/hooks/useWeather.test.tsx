/**
 * @jest-environment jsdom
 */

import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { useWeather } from './useWeather'
import { mockHourlyForecast } from '__fixtures__/data/hourlyForecast'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  mockedAxios.get.mockClear()
})

describe('useWeather hook', () => {
  mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: mockHourlyForecast })
  })

  it('returns the forecast state and a method for fetching the forecast', () => {
    const { result } = renderHook(() => useWeather())

    expect(result.current.forecast).toEqual([])
    expect(result.current.getForecast).toBeTruthy()
  })

  it('fetching the forecast sets it in state', async () => {
    const { result } = renderHook(() => useWeather())
    await waitFor(() => result.current.getForecast('MOCK_URL'))
    expect(mockedAxios.get).toHaveBeenCalledWith('MOCK_URL')
    expect(result.current.forecast).toEqual(
      mockHourlyForecast.properties.periods
    )
  })
})
