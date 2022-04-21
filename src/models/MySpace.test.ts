import { MongoClient, Db, ObjectId } from 'mongodb'

import User from './User'
import { MySpaceModel } from './MySpace'

import type { Widget } from 'types/index'
import { EXAMPLE_COLLECTION } from '__fixtures__/newPortalUser'

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
    await User.createOne(testUserId, EXAMPLE_COLLECTION, { db })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can get all widgets in a user’s My Space', async () => {
    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    expect(all).toHaveLength(1)
  })

  it('throws an error if user is not found', async () => {
    await expect(
      MySpaceModel.get({ userId: 'not a user' }, { db })
    ).rejects.toThrow()
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
    expect(
      MySpaceModel.addWidget(
        { userId: testUserId, title: 'Recent news', type: 'News' },
        { db }
      )
    ).rejects.toThrow(new Error('You can only have one News section'))
  })

  it('throws an error if widget cannot be added', async () => {
    await expect(
      MySpaceModel.addWidget(
        { userId: 'wrong user id', title: 'Recent news', type: 'News' },
        { db }
      )
    ).rejects.toThrow()
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
      expect(newsWidget).toBe(undefined)
    }
  })

  it('throws an error if cannot find user or widget to remove', async () => {
    await expect(
      MySpaceModel.deleteWidget({ _id: ObjectId(), userId: 'cat' }, { db })
    ).rejects.toThrow()
  })
})
