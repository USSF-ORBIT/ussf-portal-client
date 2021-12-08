import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'

// #TODO remove this once we have sessions
const commonName = 'HALL.MICHAEL.0123456789'

export const BookmarkModel = {
  async deleteOne(_id: string, collectionId: string, db: Context) {
    const query = {
      commonName: commonName,
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
  async hideOne(_id: string, collectionId: string, db: Context) {
    const query = {
      commonName: commonName,
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
}
