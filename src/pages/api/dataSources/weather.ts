import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'

class WeatherAPI extends RESTDataSource {
  // NOTE: we are checking here instead of startup/index.js as typically
  // we want the real url. The env var is a temporary override for
  // development and e2e testing purposes. We may eventually decide to
  // have this in startup/index.js like our other configurations
  // but this allows us to be backwards compatbile with existing deploy
  // configurations.
  override baseURL =
    process.env.WEATHER_API_URL && process.env.WEATHER_API_URL != ''
      ? process.env.WEATHER_API_URL
      : `https://api.weather.gov/points/`

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getGridData({ lat, long }: { lat: number; long: number }) {
    const { properties } = await this.get(`${lat},${long}`)
    return properties
  }
}

export default WeatherAPI
