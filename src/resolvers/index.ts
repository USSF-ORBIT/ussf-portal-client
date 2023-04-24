import { GraphQLScalarType, Kind } from 'graphql'
import { AuthenticationError } from 'apollo-server-micro'
import { ObjectId, ObjectID, MongoClient } from 'mongodb'
import type { ObjectId as ObjectIdType } from 'bson'
import { BookmarkModel } from '../models/Bookmark'
import UserModel from '../models/User'
import { CollectionModel } from '../models/Collection'

import { MySpaceModel } from 'models/MySpace'
import { Widget, PortalUser, WidgetType, MongoBookmark } from 'types'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'OID',
  description: 'Mongo object id scalar type',
  serialize(value: unknown): string {
    // check the type of received value
    if (!(value instanceof ObjectId || value instanceof ObjectID)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values')
    }
    const _id = value as ObjectIdType
    return _id.toHexString() // value sent to the client
  },
  parseValue(value: unknown): ObjectIdType {
    // check the type of received value
    // if (typeof value === 'object') return value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return ObjectId(value) // value from the client input variables
  },
  parseLiteral(ast): ObjectIdType {
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
  bookmarks: MongoBookmark[]
}

type EditCollectionInput = {
  _id: ObjectIdType
  title: string
  bookmarks: MongoBookmark[]
}

type AddBookmarkInput = {
  collectionId: ObjectIdType
  url: string
  label: string
  cmsId: string
}

type RemoveBookmarkInput = {
  _id: ObjectIdType
  collectionId: ObjectIdType
  cmsId: string
}

type EditBookmarkInput = {
  _id: ObjectIdType
  collectionId: ObjectIdType
  url: string
  label: string
}

type EditDisplayNameInput = {
  userId: string
  displayName: string
}

type EditThemeInput = {
  userId: string
  theme: 'light' | 'dark'
}
const resolvers = {
  OID: ObjectIdScalar,
  // Interface resolvers
  // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-an-interface
  Widget: {
    __resolveType(widget: Widget) {
      if (widget.type === 'Collection') return 'Collection'
      if (widget.type === 'GuardianIdeal') return 'GuardianIdeal'
      if (widget.type === 'News') return 'NewsWidget'
      if (widget.type === 'FeaturedShortcuts') return 'FeaturedShortcuts'
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
    displayName: async (
      _: undefined,
      _args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return UserModel.getDisplayName(user.userId, { db })
    },
    theme: async (
      _: undefined,
      _args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return UserModel.getTheme(user.userId, { db })
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
      { _id }: { _id: ObjectIdType },
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
      { _id, title, bookmarks }: EditCollectionInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.editOne(
        { _id, title, bookmarks, userId: user.userId },
        { db }
      )
    },
    removeCollection: async (
      _: undefined,
      { _id }: { _id: ObjectIdType },
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
    editDisplayName: async (
      _: undefined,
      { userId, displayName }: EditDisplayNameInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return UserModel.setDisplayName({ userId, displayName }, { db })
    },
    editTheme: async (
      _: undefined,
      { userId, theme }: EditThemeInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return UserModel.setTheme({ userId, theme }, { db })
    },
  },
}

export default resolvers
