import { connectDb } from '../../utils/mongodb'

import {
  up,
  down,
} from '../../migrations/1665502977143-add-display-name-to-user'

describe('[Migration: Add displayName to user]', () => {
  const testUserId = 'FLOYD.KING.TEST'
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

    // Create a test user
    await db.collection('users').insertOne({
      userId: testUserId,
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('up', async () => {
    let user = await db.collection('users').findOne({ userId: testUserId })
    expect(user).not.toHaveProperty('displayName')

    await up()

    user = await db.collection('users').findOne({ userId: testUserId })
    expect(user).toHaveProperty('displayName')
  })

  it('down', async () => {
    let user = await db.collection('users').findOne({ userId: testUserId })
    expect(user).toHaveProperty('displayName')

    await down()

    user = await db.collection('users').findOne({ userId: testUserId })
    expect(user).not.toHaveProperty('displayName')
  })
})
