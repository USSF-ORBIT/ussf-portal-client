import { Db, MongoClient } from 'mongodb'
import { DateTime, Settings } from 'luxon'

import User from './User'
import {
  exampleCollection,
  exampleCollection1,
} from '__fixtures__/newPortalUser'
import { WIDGETS } from 'constants/index'

let connection: typeof MongoClient
let db: typeof Db

// Set test time to specific time
Settings.now = () => new Date('2024-01-01T10:11:03.000Z').valueOf()

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

  test('can create and find a new user', async () => {
    const expectedUser = {
      _id: expect.anything(),
      userId: 'testUserId',
      mySpace: [
        WIDGETS.FEATUREDSHORTCUTS,
        WIDGETS.GUARDIANIDEAL,
        exampleCollection1,
      ],
      displayName: 'Floyd King',
      theme: 'light',
      lastLoginAt: DateTime.now().toISO(),
    }

    const displayName = 'Floyd King'
    await User.createOne(
      'testUserId',
      [exampleCollection],
      displayName,
      'light',
      { db },
      DateTime.now()
    )

    const insertedUser = await User.findOne('testUserId', { db })

    expect(insertedUser.userId).toBe(expectedUser.userId)
    expect(insertedUser.displayName).toBe(expectedUser.displayName)
    expect(insertedUser.theme).toBe(expectedUser.theme)
    expect(insertedUser.mySpace[0].title).toContain(
      expectedUser.mySpace[0].title
    )
    expect(insertedUser.lastLoginAt).toBe(expectedUser.lastLoginAt)
  })

  test('can create and find a new user without lastLoginAt', async () => {
    const expectedUser = {
      _id: expect.anything(),
      userId: 'testUserId',
      mySpace: [
        WIDGETS.FEATUREDSHORTCUTS,
        WIDGETS.GUARDIANIDEAL,
        exampleCollection1,
      ],
      displayName: 'Floyd King',
      theme: 'light',
      lastLoginAt: DateTime.now().toISO(),
    }

    const displayName = 'Floyd King'
    await User.createOne(
      'testUserId2',
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
    expect(insertedUser.lastLoginAt).toBe(expectedUser.lastLoginAt)
  })

  test('returns null if finding a user that doesn’t exist', async () => {
    const testUserId = 'noSuchUser'

    const foundUser = await User.findOne(testUserId, { db })
    expect(foundUser).toEqual(null)
  })

  describe('displayName', () => {
    test('can edit the displayName of a user', async () => {
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

    test('throws an error if user is not found during SET', async () => {
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

    test('can get the displayName of a user', async () => {
      const foundDisplayName = await User.getDisplayName('testUserId', {
        db,
      })
      expect(foundDisplayName).toEqual('Updated Name')
    })

    test('throws an error if user is not found during GET', async () => {
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
    test('can edit the theme of a user', async () => {
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

    test('throws an error if theme is not found on SET', async () => {
      await expect(
        User.setTheme(
          { userId: 'thisuserdoesnotexist', theme: 'dark' },
          {
            db,
          }
        )
      ).rejects.toThrow('UserModel Error: error in setTheme no user found')
    })

    test('can get the theme of a user', async () => {
      const foundTheme = await User.getTheme('testUserId', {
        db,
      })
      expect(foundTheme).toEqual('dark')
    })

    test('throws an error if theme is not found on GET', async () => {
      await expect(
        User.getTheme('thisuserdoesnotexist', {
          db,
        })
      ).rejects.toThrow('UserModel Error: error in getTheme no user found')
    })
  })

  describe('MySpace', () => {
    test('can get the myspace of a user', async () => {
      const myspace = await User.getMySpace('testUserId', {
        db,
      })
      expect(myspace.length).toEqual(3)
      expect(myspace[0].title).toEqual(WIDGETS.FEATUREDSHORTCUTS.title)
      expect(myspace[0].type).toEqual(WIDGETS.FEATUREDSHORTCUTS.type)
      expect(myspace[1].title).toEqual(WIDGETS.GUARDIANIDEAL.title)
      expect(myspace[1].type).toEqual(WIDGETS.GUARDIANIDEAL.type)
      expect(myspace[2].title).toEqual(exampleCollection1.title)
      expect(myspace[2].type).toEqual(exampleCollection1.type)
    })

    test('throws an error if user not found on GET', async () => {
      await expect(
        User.getMySpace('thisuserdoesnotexist', {
          db,
        })
      ).rejects.toThrow('UserModel Error: error in getMySpace no user found')
    })

    test('can set the myspace of a user', async () => {
      const myspace = await User.setMySpace(
        {
          userId: 'testUserId',
          mySpace: [WIDGETS.FEATUREDSHORTCUTS, exampleCollection1],
        },
        { db }
      )
      expect(myspace.length).toEqual(2)
      expect(myspace[0].title).toEqual(WIDGETS.FEATUREDSHORTCUTS.title)
      expect(myspace[0].type).toEqual(WIDGETS.FEATUREDSHORTCUTS.type)
      expect(myspace[1].title).toEqual(exampleCollection1.title)
      expect(myspace[1].type).toEqual(exampleCollection1.type)
    })

    test('throws an error if user not found on SET', async () => {
      await expect(
        User.setMySpace(
          { userId: 'thisuserdoesnotexist', mySpace: [] },
          {
            db,
          }
        )
      ).rejects.toThrow('UserModel Error: error in setMySpace no user found')
    })
  })

  describe('lastLoginAt', () => {
    test('can update the lastLoginAt of a user if no time passed in', async () => {
      const expectedUser = {
        _id: expect.anything(),
        userId: 'testUserId',
        mySpace: [exampleCollection1],
        theme: 'dark',
        lastLoginAt: DateTime.now().toISO()!,
      }

      const { userId } = expectedUser
      await User.setLastLoginAt(
        {
          userId,
        },
        {
          db,
        }
      )

      const updatedUser = await User.findOne('testUserId', { db })
      expect(updatedUser.lastLoginAt).toEqual(expectedUser.lastLoginAt)
    })

    test('can update the lastLoginAt of a user', async () => {
      const expectedUser = {
        _id: expect.anything(),
        userId: 'testUserId',
        mySpace: [exampleCollection1],
        theme: 'dark',
        lastLoginAt: DateTime.now().toISO()!,
      }

      const { userId } = expectedUser
      await User.setLastLoginAt(
        {
          userId,
          lastLoginAt: DateTime.now(),
        },
        {
          db,
        }
      )

      const updatedUser = await User.findOne('testUserId', { db })
      expect(updatedUser.lastLoginAt).toEqual(expectedUser.lastLoginAt)
    })

    test('throws an error if user not found', async () => {
      await expect(
        User.setLastLoginAt(
          {
            userId: 'thisuserdoesnotexist',
          },
          {
            db,
          }
        )
      ).rejects.toThrow(
        'UserModel Error: error in setLastLoginAt no user found'
      )
    })
  })
})
