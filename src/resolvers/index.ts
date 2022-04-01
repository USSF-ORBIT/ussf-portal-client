import { GraphQLScalarType, Kind } from 'graphql'
import { AuthenticationError } from 'apollo-server-micro'
import { ObjectId, ObjectID, MongoClient } from 'mongodb'
import type { ObjectId as typeObjectId } from 'bson'
import { BookmarkModel } from '../models/Bookmark'
import { CollectionModel } from '../models/Collection'

import { MySpaceModel } from 'models/MySpace'
import { Widget, PortalUser, WidgetType, Bookmark } from 'types'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'OID',
  description: 'Mongo object id scalar type',
  serialize(value: unknown): string {
    // check the type of received value
    if (!(value instanceof ObjectId || value instanceof ObjectID)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values')
    }
    const _id = value as typeObjectId
    return _id.toHexString() // value sent to the client
  },
  parseValue(value: unknown): typeObjectId {
    // check the type of received value
    // if (typeof value === 'object') return value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return ObjectId(value) // value from the client input variables
  },
  parseLiteral(ast): typeObjectId {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return ObjectId(ast.value) // value from the client query
  },
})

// Resolver Types

type PortalUserContext = {
  db: typeof MongoClient
  user: PortalUser
}

type AddWidgetInput = {
  title: string
  type: WidgetType
}

type AddCollectionInput = {
  title: string
  bookmarks: Bookmark[]
}

type EditCollectionInput = {
  _id: typeObjectId
  title: string
}

type AddBookmarkInput = {
  collectionId: typeObjectId
  url: string
  label: string
  cmsId: string
}

type RemoveBookmarkInput = {
  _id: typeObjectId
  collectionId: typeObjectId
  cmsId: string
}

type EditBookmarkInput = {
  _id: typeObjectId
  collectionId: typeObjectId
  url: string
  label: string
}
const resolvers = {
  OID: ObjectIdScalar,
  // Interface resolvers
  // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-an-interface
  Widget: {
    __resolveType(widget: Widget) {
      if (widget.type === 'Collection') return 'Collection'
      if (widget.type === 'News') return 'NewsWidget'
      return null // GraphQL Error
    },
  },
  // Root resolvers
  Query: {
    mySpace: async (
      _: undefined,
      args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return MySpaceModel.get({ userId: user.userId }, { db })
    },
    collections: async (
      _: undefined,
      args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.getAll({ userId: user.userId }, { db })
    },
  },
  Mutation: {
    addWidget: async (
      _: undefined,
      { title, type }: AddWidgetInput,
      { db, user }: PortalUserContext
    ) => {
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
    removeWidget: async (
      _: undefined,
      { _id }: { _id: typeObjectId },
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return MySpaceModel.deleteWidget({ _id, userId: user.userId }, { db })
    },
    addCollection: async (
      _: undefined,
      { title, bookmarks }: AddCollectionInput,
      { db, user }: PortalUserContext
    ) => {
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
    editCollection: async (
      _: undefined,
      { _id, title }: EditCollectionInput,
      { db, user }: PortalUserContext
    ) => {
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
    removeCollection: async (
      _: undefined,
      { _id }: { _id: typeObjectId },
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }
      return CollectionModel.deleteOne({ _id, userId: user.userId }, { db })
    },
    addCollections: async (
      _: undefined,
      args: any, //#TODO fix type
      { db, user }: PortalUserContext
    ) => {
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
      _: undefined,
      { collectionId, url, label, cmsId }: AddBookmarkInput,
      { db, user }: PortalUserContext
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
      _: undefined,
      { _id, collectionId, cmsId }: RemoveBookmarkInput,
      { db, user }: PortalUserContext
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
      _: undefined,
      { _id, collectionId, url, label }: EditBookmarkInput,
      { db, user }: PortalUserContext
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
