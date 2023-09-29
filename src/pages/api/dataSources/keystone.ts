import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'

class KeystoneAPI extends RESTDataSource {
  override baseURL = process.env.KEYSTONE_URL

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getLatLong(zipcode: string) {
    return this.post(`/api/graphql`, {
      body: {
        query: `query getLatLong($zipcode: String) {
          zipcode(where: {code: $zipcode}) {
              latitude
              longitude
            }
          }`,
        variables: {
          zipcode,
        },
      },
    })
  }
}

export default KeystoneAPI
