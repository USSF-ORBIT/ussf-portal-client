import { MongoClient, Db } from 'mongodb'

import User from './User'
import { SectionModel } from './Section'

import type { Section } from 'types/index'

let connection: typeof MongoClient
let db: typeof Db

describe('Section model', () => {
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

  it('can get all sections in a user’s My Space', async () => {
    const allSections = await SectionModel.getAll(
      { userId: testUserId },
      { db }
    )
    expect(allSections).toHaveLength(1)
  })

  it('can add a News section', async () => {
    const created = (await SectionModel.addOne(
      { userId: testUserId, title: 'Recent news', type: 'News' },
      { db }
    )) as Section

    expect(created.title).toEqual('Recent news')
    expect(created.type).toEqual('News')
    expect(created).toHaveProperty('_id')

    const allSections = await SectionModel.getAll(
      { userId: testUserId },
      { db }
    )
    expect(allSections).toHaveLength(2)
  })

  it('cannot add a News section if there already is one', async () => {
    const error = (await SectionModel.addOne(
      { userId: testUserId, title: 'Recent news', type: 'News' },
      { db }
    )) as Error

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toEqual('You can only have one News section')
  })

  it('can remove a News section', async () => {
    const allSections = await SectionModel.getAll(
      { userId: testUserId },
      { db }
    )
    const newsSection = allSections.find((s) => s.type === 'News')
    expect(newsSection).toBeTruthy()

    if (newsSection) {
      await SectionModel.deleteOne(
        { _id: newsSection._id, userId: testUserId },
        { db }
      )

      const found = await SectionModel.findOne(
        { _id: newsSection?._id, userId: testUserId },
        { db }
      )
      expect(found).toBe(null)
    }
  })
})
