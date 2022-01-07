import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { BookmarkInput } from 'types'

export const BookmarkModel = {
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
  ) {
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
    } catch (e) {
      console.error('Error in Bookmark.hideOne', e)
      return e
    }
  },
  async addOne(
    collectionId: string,
    url: string,
    label: string,
    cmsId: string,
    db: Context,
    userId: string
  ) {
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
      await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      return newBookmark
    } catch (e) {
      // TODO error logging
      // eslint-disable-next-line no-console
      console.error('error in Bookmark.addOne', e)
      return e
    }
  },
}
