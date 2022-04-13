import { Db, MongoClient, ObjectId } from 'mongodb'
import User from './User'
import type { Collection } from 'types/index'
import { WIDGET_TYPES } from 'constants/index'

let connection: typeof MongoClient
let db: typeof Db

const EXAMPLE_COLLECTION: Collection = {
  _id: ObjectId(),
  cmsId: 'ckwz3u58s1835ql974leo1yll',
  title: 'Example Collection',
  type: WIDGET_TYPES.COLLECTION,
  bookmarks: [
    {
      _id: ObjectId(),
      cmsId: 'cktd7c0d30190w597qoftevq1',
      url: 'https://afpcsecure.us.af.mil/',
      label: 'vMPF',
    },
    {
      _id: ObjectId(),
      cmsId: 'cktd7ettn0457w597p7ja4uye',
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
    },
    {
      _id: ObjectId(),
      cmsId: 'cktd7hjz30636w5977vu4la4c',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
    },
    {
      _id: ObjectId(),
      cmsId: 'ckwz3tphw1763ql97pia1zkvc',
      url: 'https://webmail.apps.mil/',
      label: 'Webmail',
    },
    {
      _id: ObjectId(),
      cmsId: 'ckwz3u4461813ql970wkd254m',
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
    },
  ],
}
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

    await User.createOne('testUserId', { db })

    const insertedUser = await User.findOne('testUserId', { db })

    expect(insertedUser).toEqual(expectedUser)
  })

  it('returns null if finding a user that doesn’t exist', async () => {
    const testUserId = 'noSuchUser'

    const foundUser = await User.findOne(testUserId, { db })
    expect(foundUser).toEqual(null)
  })
})
