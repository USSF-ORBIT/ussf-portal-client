import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import WeatherAPI from '../../../../pages/api/dataSources/weather'
import { mockHourlyForecast } from '../../../../__fixtures__/data/hourlyForecast'

describe('Weather API', () => {
  test('call getGridData with lat,long', async () => {
    const mockCache = {} as KeyValueCache
    const weatherAPI = new WeatherAPI({ cache: mockCache })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockPost = jest.spyOn(WeatherAPI.prototype as any, 'get')
    mockPost.mockResolvedValue(mockHourlyForecast)

    const result = await weatherAPI.getGridData({ lat: 34, long: 10 })

    expect(result).toEqual(mockHourlyForecast.properties)
  })
})
