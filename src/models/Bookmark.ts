import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { BookmarkInput, Collection, Bookmark } from 'types'

export const BookmarkModel = {
  async findOne(_id: string, collectionId: string, db: Context) {
    const found = await db
      .collection('users')
      .find({
        'mySpace.bookmarks._id': new ObjectId(_id),
      })
      .toArray()
    // Currently this is returning the document, not the nested bookmark
    // but this is only being used to validate the existence of the bookmark itself
    return found
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
    db: Context,
    userId: string,
    cmsId?: string
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
