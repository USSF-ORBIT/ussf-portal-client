import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type {
  BookmarkInput,
  BookmarkRecord,
  CollectionInput,
  CollectionRecord,
  CollectionRecords,
} from 'types'

export const CollectionModel = {
  async findOne(_id: string, db: Context, userId: string) {
    const query = {
      userId,
      'mySpace._id': new ObjectId(_id),
    }
    const found = await db.collection('users').findOne(query)

    return found?.mySpace || []
  },

  async getAll(userId: string, db: Context) {
    try {
      const foundUser = await db
        .collection('users')
        .find({ userId: userId })
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
  async addOne(
    title: string,
    bookmarks: BookmarkInput[],
    db: Context,
    userId: string
  ) {
    try {
      const existing = await CollectionModel.getAll(userId, db)
      if (existing.length >= 25) {
        return new Error('You have reached the maximum number of collections')
      }
    } catch (e) {
      console.error('Error in CollectionModel.addOne', e)
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
      // TODO error logging
      // eslint-disable-next-line no-console
      console.error('error in add collection', e)
      return e
    }
  },
  async addMany(collections: CollectionRecords, db: Context, userId: string) {
    try {
      const existing = await CollectionModel.getAll(userId, db)
      if (existing.length >= 25 || existing.length + collections.length >= 25) {
        return new Error('You have reached the maximum number of collections')
      }
    } catch (e) {
      console.error('Error in CollectionModel.addOne', e)
    }

    const newCollections = collections.map((collection: CollectionRecord) => ({
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
      const updatedCollections = await db
        .collection('users')
        .find({
          userId: userId,
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
  async editOne(_id: string, title: string, db: Context, userId: string) {
    const query = {
      userId: userId,
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
  async deleteOne(_id: string, db: Context, userId: string) {
    const query = {
      userId: userId,
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
      await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      // Return deleted collection id
      return { _id: _id }
    } catch (e) {
      // TODO error logging
      // eslint-disable-next-line no-console
      console.error('error in remove collection', e)
      return e
    }
  },
}
