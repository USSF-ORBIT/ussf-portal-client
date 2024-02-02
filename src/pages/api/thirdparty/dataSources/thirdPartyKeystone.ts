import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { DateTime } from 'luxon'
import { print } from 'graphql'
import { GET_CNOTES } from '../operations/getPublicArticles'
import { GET_DOCUMENTS } from '../operations/getDocuments'
import { GET_INTERNAL_NEWS_ARTICLES } from '../operations/getInternalNewsArticles'

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

  async getDocuments() {
    return this.post(`/api/graphql`, {
      body: {
        query: print(GET_DOCUMENTS),
      },
    })
  }

  async getInternalNewsArticles(publishedDate: DateTime) {
    return this.post(`/api/graphql`, {
      body: {
        query: print(GET_INTERNAL_NEWS_ARTICLES),
        variables: {
          publishedDate,
        },
      },
    })
  }
}

export default ThirdPartyKeystoneAPI
