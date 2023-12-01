import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { DateTime } from 'luxon'
import { print } from 'graphql'
import { GET_CNOTES } from '../operations/getPublicArticles'

class ThirdPartyKeystoneAPI extends RESTDataSource {
  override baseURL = process.env.KEYSTONE_URL

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getCNotes(publishedDate: DateTime) {
    return this.post(`/api/graphql`, {
      body: {
        query: print(GET_CNOTES),
        variables: {
          publishedDate,
        },
      },
    })
  }
}

export default ThirdPartyKeystoneAPI
