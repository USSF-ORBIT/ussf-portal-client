import { Context } from '@apollo/client'
import { ObjectId } from 'bson'

import type {
  BookmarkInput,
  Collection,
  Bookmark,
  RemovedBookmark,
} from 'types'

// Types for BookmarkModel
type AddOneInput = {
  url: string
  collectionId: string
  userId: string
  label?: string
  cmsId?: string
}

type GetAllInput = {
  collectionId: string
}

type FindOneInput = {
  _id: ObjectId
  collectionId: string
}

type DeleteOrHideInput = {
  _id: ObjectId
  collectionId: string
  userId: string
}

type EditOneInput = {
  _id: ObjectId
  collectionId: string
  userId: string
  url?: string
  label?: string
}

export const BookmarkModel = {
  async getAllInCollection({ collectionId }: GetAllInput, { db }: Context) {
    try {
      const found = await db
        .collection('users')
        .find({ 'mySpace._id': new ObjectId(collectionId) })
        .project({ 'mySpace.$': 1 })
        .toArray()

      const bookmarks = found[0]?.mySpace[0]?.bookmarks || []

      return bookmarks
    } catch (e) {
      console.error('BookmarkModel Error: error in getAllInCollection', e)
      throw e
    }
  },
  async findOne({ _id, collectionId }: FindOneInput, { db }: Context) {
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
    } catch (e) {
      console.error('BookmarkModel Error: error in findOne', e)
      throw e
    }
  },
  async editOne(
    { _id, collectionId, userId, url, label }: EditOneInput,
    { db }: Context
  ) {
    try {
      const bookmark = await BookmarkModel.findOne(
        { _id, collectionId },
        { db }
      )

      // Don't perform edits on a CMS bookmark
      if (bookmark.cmsId) {
        throw new Error('You cannot edit a bookmark copied from the CMS')
      }

      const query = {
        userId: userId,
        'mySpace.bookmarks._id': new ObjectId(_id),
      }

      const updateDocument = {
        $set: {
          'mySpace.$[outer].bookmarks.$[inner].url': url || bookmark.url,
          'mySpace.$[outer].bookmarks.$[inner].label': label || bookmark.label,
        },
      }

      const filters = {
        returnDocument: 'after',
        arrayFilters: [
          {
            'outer._id': new ObjectId(collectionId),
          },
          {
            'inner._id': new ObjectId(_id),
          },
        ],
      }

      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, filters)

      const updatedBookmark = result.value.mySpace
        .filter(
          (collection: Collection) =>
            collection._id.toString() === collectionId.toString()
        )[0]
        .bookmarks.filter(
          (bookmark: Bookmark) => bookmark._id.toString() === _id.toString()
        )[0]

      return updatedBookmark
    } catch (e) {
      console.error('BookmarkModel Error: error in editOne', e)
      throw e
    }
  },
  async deleteOne(
    { _id, collectionId, userId }: DeleteOrHideInput,
    { db }: Context
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
      console.error('BookmarkModel Error: error in deleteOne', e)
      throw e
    }
  },
  async hideOne(
    { _id, collectionId, userId }: DeleteOrHideInput,
    { db }: Context
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
    } catch (e) {
      console.error('BookmarkModel Error: error in hideOne', e)
      throw e
    }
  },
  async addOne(
    { url, collectionId, userId, label, cmsId }: AddOneInput,
    { db }: Context
  ) {
    try {
      const existing = await BookmarkModel.getAllInCollection(
        { collectionId },
        { db }
      )
      const visible = existing.filter((b: Bookmark) => !b.isRemoved)

      if (visible.length >= 10) {
        return new Error(
          'You have reached the maximum number of bookmarks per collection'
        )
      }
    } catch (e) {
      console.error('BookmarkModel Error: error in addOne', e)
      throw e
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
      // eslint-disable-next-line no-console
      console.error('BookmarkModel Error: error in addOne', e)
      throw e
    }
  },
}
