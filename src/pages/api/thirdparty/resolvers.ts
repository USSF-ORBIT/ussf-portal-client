import { DateTime } from 'luxon'
import { GraphQLJSON } from 'graphql-type-json'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'

/* Resolver Types */
export type ThirdPartyContext = {
  dataSources: {
    keystoneAPI: ThirdPartyKeystoneAPI
  }
}

/* Resolvers */
export const resolvers = {
  // This is a custom scalar type that allows us to return JSON data from our API.
  JSON: GraphQLJSON,
  Query: {
    cNotes: async (
      _: undefined,
      __: undefined,
      { dataSources: { keystoneAPI } }: ThirdPartyContext
    ) => {
      // This data is returned from
      // the keystone API, which is why it's called
      // articles instead of cNotes.
      const {
        data: { articles },
      } = await keystoneAPI.getCNotes(DateTime.now())

      return articles
    },
  },
}
