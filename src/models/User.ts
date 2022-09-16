import { Context } from '@apollo/client'

import { CollectionModel } from './Collection'

import type { PortalUser, CollectionRecords } from 'types/index'

type EditDisplayName = {
  userId: string
  displayName: string
}

type EditTheme = {
  userId: string
  theme: string
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
    theme: 'light' | 'dark',
    { db }: Context
  ) {
    const newUser: PortalUser = {
      userId,
      mySpace: [],
      displayName,
      theme,
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
  async setDisplayName(
    { userId, displayName }: EditDisplayName,
    { db }: Context
  ) {
    const user = await UserModel.findOne(userId, { db })
    if (!user) {
      throw new Error('UserModel Error: error in setDisplayName no user found')
    }

    const query = {
      userId: userId,
    }

    const updateDocument = {
      $set: {
        ...user,
        displayName: displayName,
      },
    }

    const result = await db
      .collection('users')
      .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

    return result.value
  },
  async getDisplayName(userId: string, { db }: Context) {
    const user = await db.collection('users').findOne({ userId })
    if (!user) {
      throw new Error('UserModel Error: error in getDisplayName no user found')
    }
    return user.displayName
  },
  async setTheme({ userId, theme }: EditTheme, { db }: Context) {
    const user = await UserModel.findOne(userId, { db })
    if (!user) {
      throw new Error('UserModel Error: error in setTheme no user found')
    }

    const query = {
      userId: userId,
    }

    const updateDocument = {
      $set: {
        ...user,
        theme: theme,
      },
    }

    const result = await db
      .collection('users')
      .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

    return result.value
  },
  async getTheme(userId: string, { db }: Context) {
    const user = await db.collection('users').findOne({ userId })
    if (!user) {
      throw new Error('UserModel Error: error in getTheme no user found')
    }
    return user.theme
  },
}

export default UserModel
