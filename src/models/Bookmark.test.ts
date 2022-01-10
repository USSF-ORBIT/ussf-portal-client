import { MongoClient, Db } from 'mongodb'
import { BookmarkModel } from './Bookmark'
import User from './User'

let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: string

describe('Bookmark Model', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()

    // Create test user
    const testUserId = 'testUserId'
    await User.createOne(testUserId, { db })
    const testUser = await User.findOne(testUserId, { db })
    exampleCollectionId = testUser.mySpace[0]._id
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can create and hide a new bookmark with cmsId', async () => {
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
      cmsId: 'testCmsId',
    }

    const created = await BookmarkModel.addOne(
      exampleCollectionId,
      newBookmark.url,
      newBookmark.label,
      db,
      'testUserId',
      newBookmark.cmsId
    )

    expect(created.cmsId).toEqual(newBookmark.cmsId)
    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)
  })

  it('can create and delete a new bookmark without a cmsId', async () => {
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
    }

    const created = await BookmarkModel.addOne(
      exampleCollectionId,
      newBookmark.url,
      newBookmark.label,
      db,
      'testUserId'
    )

    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)

    await BookmarkModel.deleteOne(
      created._id,
      exampleCollectionId,
      db,
      'testUserId'
    )

    const deleted = await BookmarkModel.findOne(
      created._id,
      exampleCollectionId,
      db
    )

    expect(deleted).toEqual([])
  })
})
