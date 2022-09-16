import { Db, MongoClient } from 'mongodb'

import User from './User'
import {
  exampleCollection,
  exampleCollection1,
} from '__fixtures__/newPortalUser'

let connection: typeof MongoClient
let db: typeof Db

describe('User model', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()
    // Clean db before running test suite
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can create and find a new user', async () => {
    const expectedUser = {
      _id: expect.anything(),
      userId: 'testUserId',
      mySpace: [exampleCollection1],
      displayName: 'Floyd King',
      theme: 'light',
    }

    const displayName = 'Floyd King'
    await User.createOne(
      'testUserId',
      [exampleCollection],
      displayName,
      'light',
      { db }
    )

    const insertedUser = await User.findOne('testUserId', { db })

    expect(insertedUser.userId).toBe(expectedUser.userId)
    expect(insertedUser.displayName).toBe(expectedUser.displayName)
    expect(insertedUser.theme).toBe(expectedUser.theme)
    expect(insertedUser.mySpace[0].title).toContain(
      expectedUser.mySpace[0].title
    )
  })

  it('returns null if finding a user that doesn’t exist', async () => {
    const testUserId = 'noSuchUser'

    const foundUser = await User.findOne(testUserId, { db })
    expect(foundUser).toEqual(null)
  })

  describe('displayName', () => {
    it('can edit the displayName of a user', async () => {
      const expectedUser = {
        _id: expect.anything(),
        userId: 'testUserId',
        mySpace: [exampleCollection1],
        displayName: 'Updated Name',
      }

      const { userId, displayName } = expectedUser
      await User.setDisplayName({ userId, displayName }, { db })

      const updatedUser = await User.findOne(userId, { db })

      expect(updatedUser.displayName).toEqual(displayName)
    })

    it('throws an error if user is not found during SET', async () => {
      await expect(
        User.setDisplayName(
          { userId: 'thisuserdoesnotexist', displayName: 'any name' },
          {
            db,
          }
        )
      ).rejects.toThrow(
        'UserModel Error: error in setDisplayName no user found'
      )
    })

    it('can get the displayName of a user', async () => {
      const foundDisplayName = await User.getDisplayName('testUserId', {
        db,
      })
      expect(foundDisplayName).toEqual('Updated Name')
    })

    it('throws an error if user is not found during GET', async () => {
      await expect(
        User.getDisplayName('thisuserdoesnotexist', {
          db,
        })
      ).rejects.toThrow(
        'UserModel Error: error in getDisplayName no user found'
      )
    })
  })

  describe('theme', () => {
    it('can edit the theme of a user', async () => {
      const expectedUser = {
        _id: expect.anything(),
        userId: 'testUserId',
        mySpace: [exampleCollection1],
        theme: 'dark',
      }

      const { userId, theme } = expectedUser
      await User.setTheme({ userId, theme }, { db })

      const updatedUser = await User.findOne(userId, { db })

      expect(updatedUser.theme).toEqual(theme)
    })

    it('throws an error if theme is not found on SET', async () => {
      await expect(
        User.setTheme(
          { userId: 'thisuserdoesnotexist', theme: 'dark' },
          {
            db,
          }
        )
      ).rejects.toThrow('UserModel Error: error in setTheme no user found')
    })

    it('can get the theme of a user', async () => {
      const foundTheme = await User.getTheme('testUserId', {
        db,
      })
      expect(foundTheme).toEqual('dark')
    })

    it('throws an error if theme is not found on GET', async () => {
      await expect(
        User.getTheme('thisuserdoesnotexist', {
          db,
        })
      ).rejects.toThrow('UserModel Error: error in getTheme no user found')
    })
  })
})
