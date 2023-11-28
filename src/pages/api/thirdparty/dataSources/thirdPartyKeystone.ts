import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { DateTime } from 'luxon'
import { print } from 'graphql'
import { GET_PUBLIC_ARTICLES } from '../operations/getPublicArticles'

export const ARTICLE_PUBLIC_TAGS = {
  CNOTE: 'C-Note',
}

class ThirdPartyKeystoneAPI extends RESTDataSource {
  override baseURL = process.env.KEYSTONE_URL

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getPublicArticles(publishedDate: DateTime, tag?: string) {
    // Check for public tag and convert to internal tag
    if (tag === 'CNOTE') {
      tag = ARTICLE_PUBLIC_TAGS.CNOTE
    }

    return this.post(`/api/graphql`, {
      body: {
        query: print(GET_PUBLIC_ARTICLES),
        variables: {
          publishedDate,
          tag,
        },
      },
    })
  }
}

export default ThirdPartyKeystoneAPI
