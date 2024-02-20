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

  async getSiteHeader() {
    return this.post(`/api/graphql`, {
      body: {
        query: `query getSiteHeader {
          siteHeader {
            headerButtonLabel
            headerButtonSource
            headerDropdownLabel
            dropdownItem1Label
            dropdownItem1Source
            dropdownItem2Label
            dropdownItem2Source
            dropdownItem3Label
            dropdownItem3Source
            dropdownItem4Label
            dropdownItem4Source
          }
        }`,
      },
    })
  }
}

export default KeystoneAPI
