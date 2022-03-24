import { GraphQLScalarType, Kind } from 'graphql'
import type { Resolvers } from '@apollo/client'
import { ObjectId } from 'bson'
import { AuthenticationError } from 'apollo-server-micro'
import { BookmarkModel } from '../models/Bookmark'

import { CollectionModel } from '../models/Collection'

import { MySpaceModel } from 'models/MySpace'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'OID',
  description: 'Mongo object id scalar type',
  // serialize(value: unknown): string {
  //   // check the type of received value

  //   if (!(value instanceof ObjectId || value instanceof ObjectID)) {
  //     throw new Error('ObjectIdScalar can only serialize ObjectId values')
  //   }

  //   return value.toHexString() // value sent to the client
  // },
  parseValue(value: unknown): ObjectId {
    // check the type of received value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return new ObjectId(value) // value from the client input variables
  },
  parseLiteral(ast): ObjectId {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return new ObjectId(ast.value) // value from the client query
  },
})

const resolvers: Resolvers = {
  //# TODO find correct resolver type for server
  OID: ObjectIdScalar,
  // Interface resolvers
  // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-an-interface
  Widget: {
    __resolveType(widget) {
      if (widget.bookmarks) return 'Collection'
      if (widget.type === 'News') return 'NewsWidget'
      return null // GraphQL Error
    },
  },
  // Root resolvers
  Query: {
    mySpace: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return MySpaceModel.get({ userId: user.userId }, { db })
    },
    collections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.getAll({ userId: user.userId }, { db })
    },
  },
  Mutation: {
    addWidget: async (_, { title, type }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return MySpaceModel.addWidget(
        { title, type, userId: user.userId },
        { db }
      )
    },
    removeWidget: async (_, { _id }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return MySpaceModel.deleteWidget({ _id, userId: user.userId }, { db })
    },
    addCollection: async (_, { title, bookmarks }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.addOne(
        { title, bookmarks, userId: user.userId },
        { db }
      )
    },
    editCollection: async (_, { _id, title }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.editOne(
        { _id, title, userId: user.userId },
        { db }
      )
    },
    removeCollection: async (root, { _id }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }
      return CollectionModel.deleteOne({ _id, userId: user.userId }, { db })
    },
    addCollections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.addMany(
        { collections: args.collections, userId: user.userId },
        { db }
      )
    },
    addBookmark: async (
      root,
      { collectionId, url, label, cmsId },
      { db, user }
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }
      return BookmarkModel.addOne(
        { url, collectionId, userId: user.userId, label, cmsId },
        { db }
      )
    },
    removeBookmark: async (
      root,
      { _id, collectionId, cmsId },
      { db, user }
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      if (cmsId) {
        return BookmarkModel.hideOne(
          { _id, collectionId, userId: user.userId },
          { db }
        )
      } else {
        return BookmarkModel.deleteOne(
          { _id, collectionId, userId: user.userId },
          { db }
        )
      }
    },
    editBookmark: async (
      root,
      { _id, collectionId, url, label },
      { db, user }
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return BookmarkModel.editOne(
        {
          _id,
          collectionId,
          url,
          label,
          userId: user.userId,
        },
        { db }
      )
    },
  },
}

export default resolvers
