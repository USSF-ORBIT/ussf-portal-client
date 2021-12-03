import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { Collection } from 'types/index'

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
      const updated = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      const updatedCollection = updated?.value?.mySpace?.filter(
        (c: Collection) => {
          return c._id.toString() === collectionId.toString()
        }
      )
      return updatedCollection[0]
    } catch (e) {
      console.error('error in remove collection', e)
      return e
    }
  },
  async hideOne(_id: string, collectionId: string, cmsId: string, db: Context) {
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
    } catch (e) {
      console.error('error in hide bookmark', e)
      return e
    }
  },
}
