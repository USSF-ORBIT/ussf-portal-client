import { ObjectId } from 'mongodb'
import { connectDb } from '../../utils/mongodb'
import { up, down } from '../../migrations/1680127440523-add-guardian-ideal.js'

const NEWS_COLLECTION = {
  _id: ObjectId(),
  title: 'Recent news',
  type: 'News',
}
const GUARDIAN_IDEAL_USER_ADDED = {
  _id: ObjectId(),
  title: 'Guardian Ideal',
  type: 'GuardianIdeal',
}
const FEATURED_SHORTCUTS = {
  _id: ObjectId(),
  title: 'Featured Shortcuts',
  type: 'FeaturedShortcuts',
}

describe('[Migration: Add Guardian Ideal to MySpace]', () => {
  const testUserId1 = 'testUserId1'
  const testUserId2 = 'testUserId2'
  const testUserId3 = 'testUserId3'
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

    // Create a test user with non-empty MySpace
    // No GuardianIdeal widget, Featured Shortcuts
    await db.collection('users').insertOne({
      userId: testUserId1,
      mySpace: [FEATURED_SHORTCUTS, NEWS_COLLECTION],
    })

    // Create a test user with non-empty MySpace
    // Existing GuardianIdeal widget
    await db.collection('users').insertOne({
      userId: testUserId2,
      mySpace: [GUARDIAN_IDEAL_USER_ADDED, NEWS_COLLECTION],
    })

    // Create a test user with non-empty MySpace
    // No GuardianIdeal widget, No Featured Shortcuts
    await db.collection('users').insertOne({
      userId: testUserId3,
      mySpace: [NEWS_COLLECTION],
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('up, no existing GuardianIdeal, existing FeaturedShortcuts', async () => {
    // User does not have GuardianIdeal widget before up migration
    let user = await db.collection('users').findOne({ userId: testUserId1 })

    user.mySpace.forEach((c) => {
      expect(c.type).not.toEqual('GuardianIdeal')
    })

    await up()
    // GuardianIdeal widget is added as second widget in MySpace
    user = await db.collection('users').findOne({ userId: testUserId1 })
    const secondWidget = user.mySpace[1]

    expect(secondWidget).toHaveProperty('type')
    expect(secondWidget.type).toEqual('GuardianIdeal')
    expect(secondWidget.default).toEqual(true)
  })

  it('down, remove GuardianIdeal added by migration', async () => {
    // User has GuardianIdeal widget before down migration
    let user = await db.collection('users').findOne({ userId: testUserId1 })
    let secondWidget = user.mySpace[1]

    expect(secondWidget).toHaveProperty('type')
    expect(secondWidget.type).toEqual('GuardianIdeal')
    expect(secondWidget.default).toBe(true)

    await down()
    // Because GuardianIdeal was added by the migration,
    // it will be removed from MySpace
    user = await db.collection('users').findOne({ userId: testUserId1 })
    secondWidget = user.mySpace[1]
    expect(secondWidget.type).not.toEqual('GuardianIdeal')
  })

  it('up, user added GuardianIdeal prior to migration', async () => {
    // User has GuardianIdeal widget before up migration. No changes
    // should be made to the user data.
    // Test data:
    //    mySpace: [GUARDIAN_IDEAL_USER_ADDED, NEWS_COLLECTION],
    let user = await db.collection('users').findOne({ userId: testUserId2 })
    let guardianWidget = user.mySpace[0]

    expect(guardianWidget.type).toEqual('GuardianIdeal')
    // default is a field only added by the migration
    // user-added widgets will not have it defined
    expect(guardianWidget.default).toBeUndefined()

    await up()

    user = await db.collection('users').findOne({ userId: testUserId2 })
    guardianWidget = user.mySpace[0]

    // Verify the first widget remains the same after up migration
    expect(guardianWidget.type).toEqual('GuardianIdeal')
    expect(guardianWidget.default).toBeUndefined()

    // Verify no other GuardianIdeal widgets have been added to MySpace
    const GuardianIdeal = user.mySpace.filter((w) => w.type === 'GuardianIdeal')
    expect(GuardianIdeal.length).toBe(1)
  })

  it('down, do not remove GuardianIdeal added by user', async () => {
    // User has GuardianIdeal widget before down migration
    // Test data:
    //    mySpace: [GUARDIAN_IDEAL_USER_ADDED, NEWS_COLLECTION],
    let user = await db.collection('users').findOne({ userId: testUserId2 })
    let guardianWidget = user.mySpace[0]

    expect(guardianWidget).toHaveProperty('type')
    expect(guardianWidget.type).toEqual('GuardianIdeal')
    expect(guardianWidget.default).toBeUndefined()

    await down()
    // Because GuardianIdeal was not added by the migration,
    // it remains the same.
    user = await db.collection('users').findOne({ userId: testUserId2 })
    guardianWidget = user.mySpace[0]
    expect(guardianWidget.type).toEqual('GuardianIdeal')
    expect(guardianWidget.default).toBeUndefined()
  })

  it('up, user does not have FeaturedShortcuts prior to migration', async () => {
    // User does not have FeaturedShortcuts widget before up migration.
    // Guardian Ideal will be placed at the front of the MySpace array.
    // Test data:
    //    mySpace: [NEWS_COLLECTION]
    let user = await db.collection('users').findOne({ userId: testUserId3 })
    let firstWidget = user.mySpace[0]

    expect(firstWidget.type).toEqual('News')

    await up()

    user = await db.collection('users').findOne({ userId: testUserId3 })
    firstWidget = user.mySpace[0]

    // Verify the first widget remains the same after up migration
    expect(firstWidget.type).toEqual('GuardianIdeal')
    expect(firstWidget.default).toBe(true)
    expect(user.mySpace[1].type).toEqual('News')
  })
})
