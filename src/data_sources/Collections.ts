import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb'
import type { Collection, Bookmark } from '../types'

interface UserDocument {
  _id: ObjectId
  userId: string
  collections: Collection[]
}

export default class Collections extends MongoDataSource<UserDocument> {
  getCollections(id: string) {
    // this.context has type `Context` as defined above
    // this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`
    return this.findOneById(id)
  }
}
