import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'

export const BookmarkModel = {
  async deleteOne(_id: string, collectionId: string, db: Context) {
    const query = {
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
      // update and save modified document
      await db.collection('users').findOneAndUpdate(query, updateDocument)

      return {
        _id: _id,
      }
    } catch (e) {
      console.error('error in remove collection', e)
      return e
    }
  },
  async hideOne(_id: string, collectionId: string, db: Context) {
    const query = {
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
      console.error('error in hide bookmark', e)
      return e
    }
  },
}
