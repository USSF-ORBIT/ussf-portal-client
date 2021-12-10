/* istanbul ignore file */

import type { Resolvers } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-micro'
import { ObjectId } from 'mongodb'

import { BookmarkModel } from '../models/Bookmark'

import type {
  BookmarkInput,
  BookmarkRecord,
  Collection,
  CollectionInput,
  CollectionRecord,
} from 'types/index'

const resolvers: Resolvers = {
  Query: {
    collections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      try {
        const foundUser = await db
          .collection('users')
          .find({ userId: user.userId })
          .toArray()

        if (foundUser.length > 0) {
          return foundUser[0].mySpace
        }
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in query collections', e)
        throw e
      }
    },
  },
  Mutation: {
    addCollection: async (_, { title, bookmarks }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      const newBookmarks: BookmarkInput[] = bookmarks.map(
        (input: BookmarkInput) => ({
          _id: new ObjectId(),
          url: input.url,
          label: input.label,
          cmsId: input.cmsId,
        })
      )

      const newCollection: CollectionInput = {
        _id: new ObjectId(),
        title: title,
        bookmarks: newBookmarks,
      }

      const query = {
        userId: user.userId,
      }

      const updateDocument = {
        $push: {
          mySpace: newCollection,
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)
        return newCollection
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add collection', e)
        return e
      }
    },
    editCollection: async (_, { _id, title }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      const query = {
        userId: user.userId,
        'mySpace._id': new ObjectId(_id),
      }

      const updateDocument = {
        $set: {
          'mySpace.$.title': title,
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)

        const updatedCollection = await db
          .collection('users')
          .find({ 'mySpace._id': new ObjectId(_id) })
          .project({ 'mySpace.$': 1, _id: 0 })
          .toArray()

        return updatedCollection[0].mySpace[0]
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in edit collection', e)
        return e
      }
    },
    removeCollection: async (root, { _id }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }
      const query = {
        userId: user.userId,
      }

      const updateDocument = {
        $pull: {
          mySpace: {
            _id: new ObjectId(_id),
          },
        },
      }

      try {
        // Update and save modified document
        const updated = await db
          .collection('users')
          .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

        // #TODO add error check
        const removedCollection: Collection = updated?.value?.mySpace[0]

        return removedCollection
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in remove collection', e)
        return e
      }
    },
    addCollections: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to perform this operation'
        )
      }

      const newCollections = args.collections.map(
        (collection: CollectionRecord) => ({
          _id: new ObjectId(),
          // #TODO Future data modeling to be done for canonical collections
          cmsId: collection.id,
          title: collection.title,
          bookmarks: collection.bookmarks.map((bookmark: BookmarkRecord) => ({
            _id: new ObjectId(),
            cmsId: bookmark.id,
            url: bookmark.url,
            label: bookmark.label,
          })),
        })
      )

      const query = {
        userId: user.userId,
      }

      const updateDocument = {
        $push: {
          mySpace: {
            $each: newCollections,
          },
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)
        const updatedCollections = await db
          .collection('users')
          .find({
            userId: user.userId,
          })
          .toArray()

        return updatedCollections[0].mySpace
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add collections', e)
        return e
      }
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

      const newBookmark: BookmarkInput = {
        _id: new ObjectId(),
        url,
        label,
        cmsId,
      }

      const query = {
        userId: user.userId,
        'mySpace._id': new ObjectId(collectionId),
      }

      const updateDocument = {
        $push: {
          'mySpace.$.bookmarks': newBookmark,
        },
      }
      try {
        // Update and save modified document
        await db
          .collection('users')
          .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

        return newBookmark
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add bookmark', e)
        return e
      }
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
