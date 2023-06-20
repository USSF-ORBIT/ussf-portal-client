import { Context } from '@apollo/client'

import { CollectionModel } from './Collection'
import { MySpaceModel } from './MySpace'
import type {
  PortalUser,
  CollectionRecords,
  WidgetInputType,
} from 'types/index'
import { WIDGETS } from 'constants/index'

type EditDisplayName = {
  userId: string
  displayName: string
}

type EditMySpace = {
  userId: string
  mySpace: WidgetInputType[]
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
    // Default widgets when creating a new user
    const widgets: WidgetInputType[] = [
      WIDGETS.FEATUREDSHORTCUTS,
      WIDGETS.GUARDIANIDEAL,
    ]

    // Create user
    await db.collection('users').insertOne(newUser)

    // Add default widgets - FeaturedShortcuts, GuardianIdeal
    for await (const w of widgets) {
      await MySpaceModel.addWidget(
        { userId, title: w.title, type: w.type },
        { db }
      )
    }

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
  async getMySpace(userId: string, { db }: Context) {
    const user = await db.collection('users').findOne({ userId })

    if (!user) {
      throw new Error('UserModel Error: error in getMySpace no user found')
    }

    return user.mySpace
  },
  async setMySpace({ userId, mySpace }: EditMySpace, { db }: Context) {
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
        mySpace: mySpace,
      },
    }

    const result = await db
      .collection('users')
      .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })
    console.log('result in model --- ', result)
    return result.value.mySpace
  },
}

export default UserModel
