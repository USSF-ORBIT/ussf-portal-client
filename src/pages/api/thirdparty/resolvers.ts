import { DateTime } from 'luxon'
import { GraphQLJSON } from 'graphql-type-json'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import UserModel from 'models/User'
import type { MongoClient } from 'mongodb'
/* Resolver Types */
export type ThirdPartyContext = {
  dataSources: {
    keystoneAPI: ThirdPartyKeystoneAPI
    mongodb: typeof MongoClient
  }
  userId?: string
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
    displayName: async (
      _: undefined,
      __: undefined,
      // We need to alias mongodb as db so we can
      // use our existing User model
      { dataSources: { mongodb: db }, userId }: ThirdPartyContext
    ) => {
      // Make sure we have a userId
      if (!userId) {
        throw new Error('User not authenticated')
      }

      // Look up user in MongoDB and get their display name
      return UserModel.getDisplayName(userId, { db })
    },
  },
}
