import { connectDb } from '../../utils/mongodb'

import {
  up,
  down,
} from '../../migrations/1665502977143-add-display-name-to-user'

describe('[Migration: Add displayName to user]', () => {
  const testUserIdOne = 'FLOYD.KING.TEST'
  const testUserIdTwo = 'BERNADETTE.CAMPBELL.TEST'
  const testUserIdTwoDisplayName = 'TEST DISPLAY NAME'
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

    // Create a test user WITHOUT a displayName
    await db.collection('users').insertOne({
      userId: testUserIdOne,
    })

    // Create a test user WITH a displayName
    await db.collection('users').insertOne({
      userId: testUserIdTwo,
      displayName: testUserIdTwoDisplayName,
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('up', async () => {
    let userOne = await db
      .collection('users')
      .findOne({ userId: testUserIdOne })
    expect(userOne).not.toHaveProperty('displayName')

    let userTwo = await db
      .collection('users')
      .findOne({ userId: testUserIdTwo })
    expect(userTwo).toHaveProperty('displayName', 'TEST DISPLAY NAME')

    await up()

    userOne = await db.collection('users').findOne({ userId: testUserIdOne })
    expect(userOne).toHaveProperty('displayName')

    userTwo = await db.collection('users').findOne({ userId: testUserIdTwo })
    expect(userTwo).toHaveProperty('displayName', 'TEST DISPLAY NAME')
  })

  it('down', async () => {
    let userOne = await db
      .collection('users')
      .findOne({ userId: testUserIdOne })
    expect(userOne).toHaveProperty('displayName')

    let userTwo = await db
      .collection('users')
      .findOne({ userId: testUserIdTwo })
    expect(userTwo).toHaveProperty('displayName', 'TEST DISPLAY NAME')

    await down()

    userOne = await db.collection('users').findOne({ userId: testUserIdOne })
    expect(userOne).not.toHaveProperty('displayName')

    userTwo = await db.collection('users').findOne({ userId: testUserIdTwo })
    expect(userTwo).toHaveProperty('displayName', 'TEST DISPLAY NAME')
  })
})
