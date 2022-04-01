import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { ObjectId as typeObjectId } from 'bson'

import type {
  Bookmark,
  BookmarkInput,
  Collection,
  CollectionRecords,
  PortalUser,
} from 'types'
import { WIDGET_TYPES } from 'constants/index'

// Types for CollectionModel
type GetAllInput = {
  userId: string
}

type AddOneInput = {
  title: string
  bookmarks: BookmarkInput[]
  userId: string
}

type AddManyInput = {
  collections: CollectionRecords
  userId: string
}

type EditOneInput = {
  _id: typeObjectId
  title: string
  userId: string
}

type DeleteOneInput = {
  _id: typeObjectId
  userId: string
}

export const CollectionModel = {
  async getAll(
    { userId }: GetAllInput,
    { db }: Context
  ): Promise<Collection[]> {
    try {
      const foundUser = (await db
        .collection('users')
        .findOne({ userId: userId })) as PortalUser

      return foundUser.mySpace.filter((w) => w.type === WIDGET_TYPES.COLLECTION)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('CollectionModel Error: error in getAll', e)
      throw e
    }
  },
  async addOne(
    { title, bookmarks, userId }: AddOneInput,
    { db }: Context
  ): Promise<Collection> {
    try {
      const existing = await CollectionModel.getAll({ userId }, { db })
      if (existing.length >= 25) {
        throw new Error('You have reached the maximum number of collections')
      }
    } catch (e) {
      console.error('CollectionModel Error: error in addOne', e)
      throw e
    }

    const newBookmarks: Bookmark[] = bookmarks.map((input) => ({
      _id: ObjectId(),
      url: input.url,
      label: input.label,
      cmsId: input.cmsId,
    }))

    const newCollection: Collection = {
      _id: ObjectId(),
      title: title,
      type: WIDGET_TYPES.COLLECTION,
      bookmarks: newBookmarks,
    }

    const query = {
      userId: userId,
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
      // eslint-disable-next-line no-console
      console.error('CollectionModel Error: error in addOne', e)
      throw e
    }
  },
  async addMany(
    { collections, userId }: AddManyInput,
    { db }: Context
  ): Promise<Collection[]> {
    try {
      const existing = await CollectionModel.getAll({ userId }, { db })
      if (existing.length >= 25 || existing.length + collections.length > 25) {
        throw new Error('You have reached the maximum number of collections')
      }
    } catch (e) {
      console.error('CollectionModel Error: error in addMany', e)
      throw e
    }

    // Add Many is currently only possible with CollectionRecords (from the CMS)
    const newCollections = collections.map((collection) => ({
      _id: ObjectId(),
      // #TODO Future data modeling to be done for canonical collections
      cmsId: collection.id,
      title: collection.title,
      type: WIDGET_TYPES.COLLECTION,
      bookmarks: collection.bookmarks.map((bookmark) => ({
        _id: ObjectId(),
        cmsId: bookmark.id,
        url: bookmark.url,
        label: bookmark.label,
      })),
    }))

    const query = {
      userId: userId,
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
      return newCollections
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('CollectionModel Error: error in addMany', e)
      throw e
    }
  },
  async editOne(
    { _id, title, userId }: EditOneInput,
    { db }: Context
  ): Promise<Collection> {
    const query = {
      userId: userId,
      'mySpace._id': _id,
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
        .find({ 'mySpace._id': _id })
        .project({ 'mySpace.$': 1, _id: 0 })
        .toArray()

      return updatedCollection[0].mySpace[0]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('CollectionModel Error: error in editOne', e)
      throw e
    }
  },
  async deleteOne(
    { _id, userId }: DeleteOneInput,
    { db }: Context
  ): Promise<{ _id: typeObjectId }> {
    const query = {
      userId: userId,
    }

    const updateDocument = {
      $pull: {
        mySpace: {
          _id: _id,
        },
      },
    }

    try {
      // Update and save modified document
      await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      // Return deleted collection id
      return { _id: _id }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('CollectionModel Error: error in deleteOne', e)
      throw e
    }
  },
}
