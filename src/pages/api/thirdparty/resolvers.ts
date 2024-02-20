import { DateTime } from 'luxon'
import { GraphQLJSON } from 'graphql-type-json'
import type { MongoClient } from 'mongodb'
import type { ThirdPartyUser } from './graphql'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import UserModel from 'models/User'

/* Resolver Types */
export type ThirdPartyContext = {
  dataSources: {
    keystoneAPI: ThirdPartyKeystoneAPI
    mongodb: typeof MongoClient
  }
  user: ThirdPartyUser
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
      { dataSources: { mongodb: db }, user }: ThirdPartyContext
    ) => {
      // Make sure we have a userId
      if (!user.userId) {
        throw new Error('User not authenticated')
      }

      // Look up user in MongoDB and get their display name
      return UserModel.getDisplayName(user.userId, { db })
    },
    documents: async (
      _: undefined,
      __: undefined,
      { dataSources: { keystoneAPI }, user }: ThirdPartyContext
    ) => {
      if (!user.userId) {
        throw new Error('User not authenticated')
      }

      const {
        data: { documents },
      } = await keystoneAPI.getDocuments()

      return documents
    },

    newsArticles: async (
      _: undefined,
      __: undefined,
      { dataSources: { keystoneAPI }, user }: ThirdPartyContext
    ) => {
      if (!user.userId) {
        throw new Error('User not authenticated')
      }

      const {
        data: { articles },
      } = await keystoneAPI.getNewsArticles(DateTime.now())

      return articles
    },

    landingPageArticles: async (
      _: undefined,
      __: undefined,
      { dataSources: { keystoneAPI }, user }: ThirdPartyContext
    ) => {
      if (!user.userId) {
        throw new Error('User not authenticated')
      }

      const {
        data: { articles },
      } = await keystoneAPI.getLandingPageArticles(DateTime.now())

      return articles
    },
  },
}
