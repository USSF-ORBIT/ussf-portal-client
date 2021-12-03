import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { Collection } from 'types/index'

//TODO remove once we have sessions
const commonName = 'HALL.MICHAEL.0123456789'

export const BookmarkModel = {
    async deleteOne(_id: string, collectionId: string, db: Context) {
        const query = {
            commonName: commonName,
            'mySpace._id': new ObjectId(collectionId),
        }

        // Find the bookmark so we can check if it's a CMS bookmark
        const foundBookmark = await db.collection('users').findOne(query)
        console.log('foundBookmark', foundBookmark)

        const updateDocument = {
            $pull: {
                'mySpace.$.bookmarks': {
                    _id: new ObjectId(_id),
            }
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
    }   
}