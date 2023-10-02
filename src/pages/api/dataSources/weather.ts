import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'

class WeatherAPI extends RESTDataSource {
  override baseURL = `https://api.weather.gov/points/`

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getGridData({ lat, long }: { lat: number; long: number }) {
    const { properties } = await this.get(`${lat},${long}`)
    return properties
  }
}

export default WeatherAPI
