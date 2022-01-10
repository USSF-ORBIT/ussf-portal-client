import { MongoClient, Db } from 'mongodb'
import User from './User'
import { CollectionModel } from './Collection'
import { CollectionInput, CollectionRecords } from 'types'

let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: string
let testUserId: string

describe('Bookmark Model', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()

    // Create test user
    testUserId = 'testUserId'
    await User.createOne(testUserId, { db })
    const testUser = await User.findOne(testUserId, { db })
    exampleCollectionId = testUser.mySpace[0]._id
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can find a collection', async () => {
    const found = await CollectionModel.findOne(
      exampleCollectionId,
      db,
      testUserId
    )

    expect(found.length).toEqual(1)
    expect(found[0]._id).toEqual(exampleCollectionId)
  })

  it('can get all existing collections', async () => {
    const found = await CollectionModel.getAll(testUserId, db)
    expect(found.length).toBe(1)
    expect(`${found[0]._id}`).toBe(`${exampleCollectionId}`)
  })

  it('can add a collection', async () => {
    const title = 'New Collection'
    const created = (await CollectionModel.addOne(
      title,
      [],
      db,
      testUserId
    )) as CollectionInput

    expect(created.title).toBe(title)
    expect(created.bookmarks).toHaveLength(0)
    expect(created).toHaveProperty('_id')

    const found = await CollectionModel.getAll(testUserId, db)
    expect(found.length).toBe(2)
  })

  it('can add many collections', async () => {
    const manyCollections: CollectionRecords = [
      {
        id: 'testCmsId1',
        title: 'CMS Collection 1',
        bookmarks: [
          {
            id: 'bookmarkId1',
            url: 'https://example1.com',
            label: 'Label 1',
          },
        ],
      },
      {
        id: 'testCmsId2',
        title: 'CMS Collection 2',
        bookmarks: [
          {
            id: 'bookmarkId2',
            url: 'https://example2.com',
            label: 'Label 2',
          },
        ],
      },
    ]

    const created = await CollectionModel.addMany(
      manyCollections,
      db,
      testUserId
    )

    expect(created).toHaveLength(4)
    expect(created).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cmsId: 'testCmsId1',
        }),
        expect.objectContaining({
          cmsId: 'testCmsId2',
        }),
      ])
    )
  })

  it('can edit a collection title', async () => {
    const title = 'New Title'
    const updated = await CollectionModel.editOne(
      exampleCollectionId,
      title,
      db,
      testUserId
    )

    expect(updated.title).toBe(title)
  })

  it('can delete a collection', async () => {
    await CollectionModel.deleteOne(exampleCollectionId, db, testUserId)
    const found = await CollectionModel.findOne(
      exampleCollectionId,
      db,
      testUserId
    )

    expect(found.length).toBe(0)
  })
})
