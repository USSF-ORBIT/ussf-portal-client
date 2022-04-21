import { Context } from '@apollo/client'
import { CollectionModel } from './Collection'
import type { PortalUser, Collection } from 'types/index'

const UserModel = {
  async findOne(userId: string, { db }: Context) {
    const foundUser = await db.collection('users').findOne({ userId })
    return foundUser
  },
  async createOne(userId: string, exampleCollection: any, { db }: Context) {
    const newUser: PortalUser = {
      userId,
      mySpace: [],
    }
    // Create user
    await db.collection('users').insertOne(newUser)
    // Add example collection
    await CollectionModel.addOne(
      {
        title: exampleCollection.title,
        bookmarks: exampleCollection.bookmarks,
        userId,
      },
      { db }
    )

    return true
  },
}

export default UserModel
