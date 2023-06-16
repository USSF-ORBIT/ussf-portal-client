import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { ObjectId as ObjectIdType } from 'bson'

import type {
  Bookmark,
  BookmarkModelInput,
  Collection,
  CollectionRecords,
  PortalUser,
} from 'types'
import { WIDGET_TYPES } from 'constants/index'

// Types for CollectionModel
// #TODO These types should be revisited when we add codegen to resolvers
type GetAllInput = {
  userId: string
}

type AddOneInput = {
  title: string
  bookmarks: BookmarkModelInput[]
  userId: string
}

type AddManyInput = {
  collections: CollectionRecords
  userId: string
}

type EditOneInput = {
  _id: ObjectIdType
  title: string
  bookmarks?: Bookmark[]
  userId: string
}

type DeleteOneInput = {
  _id: ObjectIdType
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

      return foundUser.mySpace.filter(
        (w) => w.type === WIDGET_TYPES.COLLECTION
      ) as Collection[]
    } catch (e) {
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

    const newBookmarks: BookmarkModelInput[] = bookmarks.map((input) => ({
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
      console.error('CollectionModel Error: error in addMany', e)
      throw e
    }
  },
  async editOne(
    { _id, title, bookmarks, userId }: EditOneInput,
    { db }: Context
  ): Promise<Collection> {
    const query = {
      userId: userId,
      'mySpace._id': _id,
    }

    const updateDocument = bookmarks
      ? {
          $set: {
            'mySpace.$.title': title,
            'mySpace.$.bookmarks': bookmarks,
          },
        }
      : {
          $set: {
            'mySpace.$.title': title,
          },
        }

    try {
      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      const updatedCollection = result.value.mySpace.filter(
        (collection: Collection) => collection._id.toString() === _id.toString()
      )[0]

      return updatedCollection
    } catch (e) {
      console.error('CollectionModel Error: error in editOne', e)
      throw e
    }
  },
  async deleteOne(
    { _id, userId }: DeleteOneInput,
    { db }: Context
  ): Promise<{ _id: ObjectIdType }> {
    const query = {
      userId: userId,
    }

    const updateDocument = {
      $pull: {
        mySpace: { _id },
      },
    }

    try {
      // Update and save modified document
      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      if (result.value === null)
        throw new Error('CollectionModel Error: Document not updated')
      // Return deleted collection id
      return { _id }
    } catch (e) {
      console.error('CollectionModel Error: error in deleteOne', e)
      throw e
    }
  },
}
