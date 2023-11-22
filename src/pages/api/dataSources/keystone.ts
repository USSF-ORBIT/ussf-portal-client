import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { DateTime } from 'luxon'
import { GET_INTERNAL_NEWS_ARTICLES } from 'operations/cms/queries/getInternalNewsArticles'
import { print } from 'graphql'

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

  async getArticles(publishedDate: DateTime, tag: string) {
    return this.post(`/api/graphql`, {
      body: {
        query: print(GET_INTERNAL_NEWS_ARTICLES),
        variables: {
          publishedDate,
          tag,
        },
      },
    })
  }
}

export default KeystoneAPI
