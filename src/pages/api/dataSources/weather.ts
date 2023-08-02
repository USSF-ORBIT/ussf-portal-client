import { RESTDataSource } from 'apollo-datasource-rest'

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `https://api.weather.gov/points/`
  }

  async getGridData({ lat, long }: { lat: number; long: number }) {
    const { properties } = await this.get(`${lat},${long}`)
    return properties
  }
}
