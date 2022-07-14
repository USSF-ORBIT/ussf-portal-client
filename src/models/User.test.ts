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
    }

    const displayName = 'Floyd King'
    await User.createOne('testUserId', [exampleCollection], displayName, { db })

    const insertedUser = await User.findOne('testUserId', { db })

    expect(insertedUser.mySpace[0].title).toContain(
      expectedUser.mySpace[0].title
    )
  })

  it('can edit the displayName of a user', async () => {
    const expectedUser = {
      _id: expect.anything(),
      userId: 'testUserId',
      mySpace: [exampleCollection1],
      displayName: 'Updated Name',
    }

    const { userId, displayName } = expectedUser
    await User.editOne({ userId, displayName }, { db })

    const updatedUser = await User.findOne(userId, { db })

    expect(updatedUser.displayName).toEqual(displayName)
  })

  it('can get the displayName of a user', async () => {
    const foundDisplayName = await User.getDisplayName('testUserId', {
      db,
    })
    expect(foundDisplayName).toEqual('Updated Name')
  })

  it('returns null if finding a user that doesn’t exist', async () => {
    const testUserId = 'noSuchUser'

    const foundUser = await User.findOne(testUserId, { db })
    expect(foundUser).toEqual(null)
  })
})
