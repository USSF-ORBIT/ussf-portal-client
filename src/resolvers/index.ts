/* istanbul ignore file */

import type { Resolvers } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-micro'
import { BookmarkModel } from '../models/Bookmark'
import { CollectionModel } from 'models/Collection'

const resolvers: Resolvers = {
  Query: {
    collections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.getAllCollections(user.userId, db)
    },
  },
  Mutation: {
    addCollection: async (_, { title, bookmarks }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.addOne(title, bookmarks, db, user.userId)
    },
    editCollection: async (_, { _id, title }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.editOne(_id, title, db, user.userId)
    },
    removeCollection: async (root, { _id }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }
      return CollectionModel.removeOne(_id, db, user.userId)
    },
    addCollections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return CollectionModel.addMany(args.collections, db, user.userId)
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
        collectionId,
        url,
        label,
        cmsId,
        db,
        user.userId
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
        return BookmarkModel.hideOne(_id, collectionId, db, user.userId)
      } else {
        return BookmarkModel.deleteOne(_id, collectionId, db, user.userId)
      }
    },
  },
}

export default resolvers
