/* istanbul ignore file */

import type { Resolvers } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-micro'
import { BookmarkModel } from '../models/Bookmark'
import { CollectionModel } from '../models/Collection'
import { SectionModel } from 'models/Section'

const resolvers: Resolvers = {
  Query: {
    sections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return SectionModel.getAll({ userId: user.userId }, { db })
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
    addSection: async (_, { title, type }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return SectionModel.addOne({ title, type, userId: user.userId }, { db })
    },
    removeSection: async (_, { _id }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      return SectionModel.deleteOne({ _id, userId: user.userId }, { db })
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
