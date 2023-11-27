import { DateTime } from 'luxon'
import { GraphQLJSON } from 'graphql-type-json'
import KeystoneAPI from '../dataSources/keystone'

/* Resolver Types */
type ArticleInput = {
  publishedDate: string
  tag: string
}

export type ThirdPartyContext = {
  dataSources: {
    keystoneAPI: KeystoneAPI
  }
}

/* Resolvers */
export const resolvers = {
  // This is a custom scalar type that allows us to return JSON data from our API.
  JSON: GraphQLJSON,
  Query: {
    articles: async (
      _: undefined,
      { tag }: ArticleInput,
      { dataSources: { keystoneAPI } }: ThirdPartyContext
    ) => {
      const {
        data: { articles },
      } = await keystoneAPI.getArticles(DateTime.now(), tag)
      return articles
    },
  },
}
