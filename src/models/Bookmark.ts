import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type {
  BookmarkInput,
  Collection,
  Bookmark,
  RemovedBookmark,
} from 'types'

export const BookmarkModel = {
  async getAllCollectionBookmarks(collectionId: string, db: Context) {
    try {
      const found = await db
        .collection('users')
        .find({ 'mySpace._id': new ObjectId(collectionId) })
        .project({ 'mySpace.$': 1 })
        .toArray()

      const bookmarks = found[0]?.mySpace[0]?.bookmarks || []

      return bookmarks
    } catch (error) {
      console.error('Error in BookmarkModel.getAllCollectionBookmarks', error)
    }
  },
  async findOne(_id: string, collectionId: string, db: Context) {
    try {
      const found = await db
        .collection('users')
        .aggregate([
          { $unwind: '$mySpace' },
          { $match: { 'mySpace._id': new ObjectId(collectionId) } },
          { $unwind: '$mySpace.bookmarks' },
          { $match: { 'mySpace.bookmarks._id': new ObjectId(_id) } },
          {
            $project: {
              'mySpace.bookmarks': 1,
            },
          },
        ])
        .toArray()

      return found[0]?.mySpace.bookmarks || []
    } catch (error) {
      console.error('Error in BookmarkModel.findOne', error)
    }
  },
  async deleteOne(
    _id: string,
    collectionId: string,
    db: Context,
    userId: string
  ) {
    const query = {
      userId,
      'mySpace._id': new ObjectId(collectionId),
    }

    const updateDocument = {
      $pull: {
        'mySpace.$.bookmarks': {
          _id: new ObjectId(_id),
        },
      },
    }
    try {
      await db.collection('users').findOneAndUpdate(query, updateDocument)

      return {
        _id: _id,
      }
    } catch (e) {
      console.error('Error in Bookmark.deleteOne', e)
      return e
    }
  },
  async hideOne(
    _id: string,
    collectionId: string,
    db: Context,
    userId: string
  ): Promise<RemovedBookmark> {
    const query = {
      userId,
      'mySpace.bookmarks._id': new ObjectId(_id),
    }

    const updateDocument = {
      $set: {
        'mySpace.$[outer].bookmarks.$[inner].isRemoved': true,
      },
    }

    const filters = {
      arrayFilters: [
        {
          'outer._id': new ObjectId(collectionId),
        },
        {
          'inner._id': new ObjectId(_id),
        },
      ],
    }
    try {
      await db.collection('users').updateOne(query, updateDocument, filters)

      return {
        _id: _id,
      }
    } catch (e: any) {
      console.error('Error in Bookmark.hideOne', e)
      return e
    }
  },
  async addOne(
    collectionId: string,
    url: string,
    db: Context,
    userId: string,
    label?: string,
    cmsId?: string
  ) {
    try {
      const existing = await BookmarkModel.getAllCollectionBookmarks(
        collectionId,
        db
      )
      if (existing.length >= 10) {
        return new Error(
          'You have reached the maximum number of bookmarks per collection'
        )
      }
    } catch (e) {
      console.error('Error in CollectionModel.addOne', e)
    }

    const newBookmark: BookmarkInput = {
      _id: new ObjectId(),
      url,
      label,
      cmsId,
    }

    const query = {
      userId,
      'mySpace._id': new ObjectId(collectionId),
    }

    const updateDocument = {
      $push: {
        'mySpace.$.bookmarks': newBookmark,
      },
    }
    try {
      // Update and save modified document
      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      const createdBookmark = result.value.mySpace
        .filter(
          (collection: Collection) =>
            collection._id.toString() === collectionId.toString()
        )[0]
        .bookmarks.filter(
          (bookmark: Bookmark) =>
            bookmark._id.toString() === newBookmark._id.toString()
        )[0]

      return createdBookmark
    } catch (e) {
      // TODO error logging
      // eslint-disable-next-line no-console
      console.error('error in Bookmark.addOne', e)
      return e
    }
  },
}
