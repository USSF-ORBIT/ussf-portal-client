import { ObjectId } from 'mongodb'
import { connectDb } from '../../utils/mongodb'
import {
  up,
  down,
} from '../../migrations/1679951734168-add-featured-shortcuts-widget'

const NEWS_COLLECTION = {
  _id: ObjectId(),
  title: 'Recent news',
  type: 'News',
}
const FEATURED_SHORTCUTS_USER_ADDED = {
  _id: ObjectId(),
  title: 'Featured Shortcuts',
  type: 'FeaturedShortcuts',
}

describe('[Migration: Add Featured Shortcuts to MySpace]', () => {
  const testUserId1 = 'testUserId1'
  const testUserId2 = 'testUserId2'
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
    // No FeaturedShortcuts widget
    await db.collection('users').insertOne({
      userId: testUserId1,
      mySpace: [NEWS_COLLECTION],
    })

    // Create a test user with non-empty MySpace
    // Existing FeaturedShortcuts widget
    await db.collection('users').insertOne({
      userId: testUserId2,
      mySpace: [FEATURED_SHORTCUTS_USER_ADDED, NEWS_COLLECTION],
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('up, no existing FeaturedShortcuts', async () => {
    // User does not have FeaturedShortcuts widget before up migration
    let user = await db.collection('users').findOne({ userId: testUserId1 })

    user.mySpace.forEach((c) => {
      expect(c.type).not.toEqual('FeaturedShortcuts')
    })

    await up()
    // FeaturedShortcuts widget is added as first widget in MySpace
    user = await db.collection('users').findOne({ userId: testUserId1 })
    const firstWidget = user.mySpace[0]

    expect(firstWidget).toHaveProperty('type')
    expect(firstWidget.type).toEqual('FeaturedShortcuts')
    expect(firstWidget.default).toEqual(true)
  })

  it('down, remove FeaturedShorcuts added by migration', async () => {
    // User has FeaturedShortcuts widget before down migration
    let user = await db.collection('users').findOne({ userId: testUserId1 })
    let firstWidget = user.mySpace[0]

    expect(firstWidget).toHaveProperty('type')
    expect(firstWidget.type).toEqual('FeaturedShortcuts')
    expect(firstWidget.default).toBe(true)

    await down()
    // Because FeaturedCollections was added by the migration,
    // it will be removed from MySpace
    user = await db.collection('users').findOne({ userId: testUserId1 })
    firstWidget = user.mySpace[0]
    expect(firstWidget.type).not.toEqual('FeaturedShortcuts')
  })

  it('up, user added FeaturedShortcuts', async () => {
    // User has FeaturedShortcuts widget before up migration
    let user = await db.collection('users').findOne({ userId: testUserId2 })
    let firstWidget = user.mySpace[0]

    expect(firstWidget.type).toEqual('FeaturedShortcuts')
    expect(firstWidget.default).toBeUndefined()

    await up()

    user = await db.collection('users').findOne({ userId: testUserId2 })
    firstWidget = user.mySpace[0]

    // Verify the first widget remains the same after up migration
    expect(firstWidget.type).toEqual('FeaturedShortcuts')
    expect(firstWidget.default).toBeUndefined()

    // Verify no other FeaturedShortcuts widgets have been added to MySpace
    const featuredShortcuts = user.mySpace.filter(
      (w) => w.type === 'FeaturedShortcuts'
    )
    expect(featuredShortcuts.length).toBe(1)
  })

  it('down, do not remove FeaturedShorcuts added by user', async () => {
    // User has FeaturedShortcuts widget before down migration
    let user = await db.collection('users').findOne({ userId: testUserId2 })
    let firstWidget = user.mySpace[0]

    expect(firstWidget).toHaveProperty('type')
    expect(firstWidget.type).toEqual('FeaturedShortcuts')
    expect(firstWidget.default).toBeUndefined()

    await down()
    // Because FeaturedCollections was not added by the migration,
    // it remains the same
    user = await db.collection('users').findOne({ userId: testUserId2 })
    firstWidget = user.mySpace[0]
    expect(firstWidget.type).toEqual('FeaturedShortcuts')
  })
})
