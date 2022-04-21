import { Db, MongoClient, ObjectId } from 'mongodb'
import User from './User'
import { EXAMPLE_COLLECTION } from '../__fixtures__/newPortalUser'

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
      mySpace: [EXAMPLE_COLLECTION],
    }

    await User.createOne('testUserId', EXAMPLE_COLLECTION, { db })

    const insertedUser = await User.findOne('testUserId', { db })

    expect(insertedUser).toEqual(expectedUser)
  })

  it('returns null if finding a user that doesn’t exist', async () => {
    const testUserId = 'noSuchUser'

    const foundUser = await User.findOne(testUserId, { db })
    expect(foundUser).toEqual(null)
  })
})
