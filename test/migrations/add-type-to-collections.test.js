import { ObjectId } from 'mongodb'

import { connectDb } from '../../utils/mongodb'

import {
  up,
  down,
} from '../../migrations/1645636869484-add-type-to-collections'

const TEST_COLLECTION_NO_TYPE = {
  _id: new ObjectId(),
  cmsId: 'ckwz3u58s1835ql974leo1yll',
  title: 'Example Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      cmsId: 'cktd7c0d30190w597qoftevq1',
      url: 'https://afpcsecure.us.af.mil/',
      label: 'vMPF',
    },
  ],
}

describe('[Migration: Add type to collection]', () => {
  const testUserId = 'testUserId'
  let connection
  let db

  beforeAll(async () => {
    // This is NOT the connection used in the migration itself
    // Just use to seed data for the test
    const mongoConnection = await connectDb()
    connection = mongoConnection.connection
    db = mongoConnection.db

    // Reset db
    await db.collection('users').deleteMany({})

    // Create a test user (with one default collection)
    await db.collection('users').insertOne({
      userId: testUserId,
      mySpace: [TEST_COLLECTION_NO_TYPE],
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('up', async () => {
    let user = await db.collection('users').findOne({ userId: testUserId })

    user.mySpace.forEach((c) => {
      expect(c).not.toHaveProperty('type')
    })

    await up()

    user = await db.collection('users').findOne({ userId: testUserId })
    user.mySpace.forEach((c) => {
      expect(c).toHaveProperty('type')
      expect(c.type).toEqual('Collection')
    })
  })

  it('down', async () => {
    let user = await db.collection('users').findOne({ userId: testUserId })

    user.mySpace.forEach((c) => {
      expect(c).toHaveProperty('type')
      expect(c.type).toEqual('Collection')
    })

    await down()

    user = await db.collection('users').findOne({ userId: testUserId })
    user.mySpace.forEach((c) => {
      expect(c).not.toHaveProperty('type')
    })
  })
})
