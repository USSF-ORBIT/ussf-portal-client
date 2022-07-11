import { Context } from '@apollo/client'

import { CollectionModel } from './Collection'

import type { PortalUser, CollectionRecords } from 'types/index'

const UserModel = {
  async findOne(userId: string, { db }: Context) {
    const foundUser = await db.collection('users').findOne({ userId })
    return foundUser
  },
  async createOne(
    userId: string,
    initCollections: CollectionRecords,
    displayName: string,
    { db }: Context
  ) {
    const newUser: PortalUser = {
      userId,
      mySpace: [],
      displayName,
    }

    // Create user
    await db.collection('users').insertOne(newUser)

    // Seed with initial collection(s) (records from CMS)
    await CollectionModel.addMany(
      {
        collections: initCollections,
        userId,
      },
      { db }
    )

    return true
  },
}

export default UserModel
