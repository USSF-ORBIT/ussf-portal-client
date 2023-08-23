import { RESTDataSource } from 'apollo-datasource-rest'

class KeystoneAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.KEYSTONE_URL
  }

  async getLatLong(zipcode: string) {
    return this.post(`/api/graphql`, {
      query: `query getLatLong($zipcode: String) {
            zipcode(where: {code: $zipcode}) {
                latitude
                longitude
              }
            }`,
      variables: {
        zipcode,
      },
    })
  }
}

export default KeystoneAPI
