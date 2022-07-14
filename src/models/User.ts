import { Context } from '@apollo/client'

import { CollectionModel } from './Collection'

import type { PortalUser, CollectionRecords } from 'types/index'

type EditOneInput = {
  userId: string
  displayName: string
}

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
  async editOne({ userId, displayName }: EditOneInput, { db }: Context) {
    const user = await UserModel.findOne(userId, { db })

    const query = {
      userId: userId,
    }

    const updateDocument = {
      $set: {
        ...user,
        displayName: displayName,
      },
    }

    await db.collection('users').updateOne(query, updateDocument)
  },
  async getDisplayName(userId: string, { db }: Context) {
    try {
      const user = await db.collection('users').findOne({ userId })
      if (user) {
        return user.displayName
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('UserModel Error: error in getDisplayName', e)
      throw e
    }
  },
}

export default UserModel
