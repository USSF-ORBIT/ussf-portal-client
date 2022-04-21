import { Context } from '@apollo/client'
import type { PortalUser, Collection } from 'types/index'

const UserModel = {
  async findOne(userId: string, { db }: Context) {
    const foundUser = await db.collection('users').findOne({ userId })
    return foundUser
  },
  async createOne(
    userId: string,
    exampleCollection: Collection,
    { db }: Context
  ) {
    const newUser: PortalUser = {
      userId,
      mySpace: [exampleCollection],
    }
    // Create user
    await db.collection('users').insertOne(newUser)

    return true
  },
}

export default UserModel
