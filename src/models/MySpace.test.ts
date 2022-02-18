import { MongoClient, Db } from 'mongodb'

import User from './User'
import { MySpaceModel } from './MySpace'

import type { Widget } from 'types/index'

let connection: typeof MongoClient
let db: typeof Db

describe('My Space model', () => {
  const testUserId = 'testUserId'

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()

    // Clean up db
    await db.collection('users').deleteMany({})

    // Create a test user (with one default collection)
    await User.createOne(testUserId, { db })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can get all widgets in a user’s My Space', async () => {
    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    expect(all).toHaveLength(1)
  })

  it('can add a News widget', async () => {
    const created = (await MySpaceModel.addWidget(
      { userId: testUserId, title: 'Recent news', type: 'News' },
      { db }
    )) as Widget

    expect(created.title).toEqual('Recent news')
    expect(created.type).toEqual('News')
    expect(created).toHaveProperty('_id')

    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    expect(all).toHaveLength(2)
  })

  it('cannot add a News widget if there already is one', async () => {
    const error = (await MySpaceModel.addWidget(
      { userId: testUserId, title: 'Recent news', type: 'News' },
      { db }
    )) as Error

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toEqual('You can only have one News section')
  })

  it('can remove a News widget', async () => {
    let allSections = await MySpaceModel.get({ userId: testUserId }, { db })

    let newsWidget = allSections.find((s) => s.type === 'News')
    expect(newsWidget).toBeTruthy()

    if (newsWidget) {
      await MySpaceModel.deleteWidget(
        { _id: newsWidget._id, userId: testUserId },
        { db }
      )

      allSections = await MySpaceModel.get({ userId: testUserId }, { db })
      newsWidget = allSections.find((s) => s.type === 'News')
      expect(newsWidget).toBe(null)
    }
  })
})
