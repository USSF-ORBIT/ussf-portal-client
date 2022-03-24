import { MongoClient, Db } from 'mongodb'
import { ObjectId } from 'bson'
import User from './User'
import { CollectionModel } from './Collection'
import { MySpaceModel } from './MySpace'
import { CollectionInput, CollectionRecords } from 'types'

let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: ObjectId
let testUserId: string

const manyCollections: CollectionRecords = [
  {
    id: 'testCmsId1',
    title: 'CMS Collection 1',
    bookmarks: [],
  },
  {
    id: 'testCmsId2',
    title: 'CMS Collection 2',
    bookmarks: [],
  },
  {
    id: 'testCmsId3',
    title: 'CMS Collection 3',
    bookmarks: [],
  },
  {
    id: 'testCmsId3',
    title: 'CMS Collection 4',
    bookmarks: [],
  },
  {
    id: 'testCmsId5',
    title: 'CMS Collection 5',
    bookmarks: [],
  },
  {
    id: 'testCmsId6',
    title: 'CMS Collection 6',
    bookmarks: [],
  },
  {
    id: 'testCmsId7',
    title: 'CMS Collection 7',
    bookmarks: [],
  },
  {
    id: 'testCmsId8',
    title: 'CMS Collection 8',
    bookmarks: [],
  },
  {
    id: 'testCmsId9',
    title: 'CMS Collection 9',
    bookmarks: [],
  },
  {
    id: 'testCmsId10',
    title: 'CMS Collection 10',
    bookmarks: [],
  },
  {
    id: 'testCmsId11',
    title: 'CMS Collection 11',
    bookmarks: [],
  },
  {
    id: 'testCmsId12',
    title: 'CMS Collection 12',
    bookmarks: [],
  },
  {
    id: 'testCmsId13',
    title: 'CMS Collection 13',
    bookmarks: [],
  },
  {
    id: 'testCmsId14',
    title: 'CMS Collection 14',
    bookmarks: [],
  },
  {
    id: 'testCmsId15',
    title: 'CMS Collection 15',
    bookmarks: [],
  },
  {
    id: 'testCmsId16',
    title: 'CMS Collection 16',
    bookmarks: [],
  },
  {
    id: 'testCmsId17',
    title: 'CMS Collection 17',
    bookmarks: [],
  },
  {
    id: 'testCmsId18',
    title: 'CMS Collection 18',
    bookmarks: [],
  },
  {
    id: 'testCmsId19',
    title: 'CMS Collection 19',
    bookmarks: [],
  },
  {
    id: 'testCmsId20',
    title: 'CMS Collection 20',
    bookmarks: [],
  },
  {
    id: 'testCmsId21',
    title: 'CMS Collection 21',
    bookmarks: [],
  },
  {
    id: 'testCmsId22',
    title: 'CMS Collection 22',
    bookmarks: [],
  },
  {
    id: 'testCmsId23',
    title: 'CMS Collection 23',
    bookmarks: [],
  },
]

describe('Collection Model', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()
    // Clean db before running test suite
    await db.collection('users').deleteMany({})

    // Create test user
    testUserId = 'testUserId'
    await User.createOne(testUserId, { db })
    const testUser = await User.findOne(testUserId, { db })
    exampleCollectionId = testUser.mySpace[0]._id
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can get all collections', async () => {
    const all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all).toHaveLength(1)
  })

  it('does not return widgets that are not collections', async () => {
    await MySpaceModel.addWidget(
      { userId: testUserId, title: 'Recent News', type: 'News' },
      { db }
    )

    const all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all).toHaveLength(1)
  })

  it('can add a collection', async () => {
    // Start Data: Test user, 1 collection
    // End Data: Test user, 2 collections
    const title = 'New Collection'
    const created = (await CollectionModel.addOne(
      { title: title, bookmarks: [], userId: testUserId },
      { db }
    )) as CollectionInput

    expect(created.title).toBe(title)
    expect(created.bookmarks).toHaveLength(0)
    expect(created).toHaveProperty('_id')

    const found = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(found.length).toBe(2)
  })

  it('can add many collections', async () => {
    // Start Data: Test user, 2 collections
    // End Data: Test user, 25 collections

    let all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(2)

    const created = await CollectionModel.addMany(
      { collections: manyCollections, userId: testUserId },
      { db }
    )

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

    all = await CollectionModel.getAll({ userId: testUserId }, { db })

    expect(all.length).toBe(25)
  })

  it('can edit a collection title', async () => {
    // Start Data: Test user, 1 collection, 'Example Collection'
    // End Data: Test user, 1 collection, 'New Title'
    const title = 'New Title'
    const updated = await CollectionModel.editOne(
      {
        _id: exampleCollectionId,
        userId: testUserId,
        title: title,
      },
      { db }
    )

    expect(updated.title).toBe(title)
  })

  it('can delete a collection', async () => {
    // Start Data: Test user, 25 collections
    // End Data: Test user, 24 collections
    let all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(25)

    await CollectionModel.deleteOne(
      { _id: exampleCollectionId, userId: testUserId },
      { db }
    )

    all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(24)
  })

  it('cannot add more than 25 collections using addMany', async () => {
    // Start Data: Test user, 24 collections
    // Action: Add 2 more collections
    // End Data: Return error, Test user, 24 collections
    let all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(24)

    expect(
      CollectionModel.addMany(
        { collections: manyCollections, userId: testUserId },
        { db }
      )
    ).rejects.toEqual(
      new Error('You have reached the maximum number of collections')
    )

    all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(24)
  })

  it('cannot go over 25 collections limit using addOne', async () => {
    // Start Data: Test user, 24 collection
    // Action: Add 1 collection to max out, no error
    // Action: Add 1 additional collection, error
    // End Data: Test user, 25 collections

    let all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toBe(24)

    await CollectionModel.addOne(
      {
        title: 'CMS Collection 26',
        bookmarks: [],
        userId: testUserId,
      },
      { db }
    )

    all = await CollectionModel.getAll({ userId: testUserId }, { db })

    expect(all.length).toEqual(25)

    expect(
      CollectionModel.addOne(
        {
          title: 'CMS Collection 27',
          bookmarks: [],
          userId: testUserId,
        },
        { db }
      )
    ).rejects.toEqual(
      new Error('You have reached the maximum number of collections')
    )

    all = await CollectionModel.getAll({ userId: testUserId }, { db })
    expect(all.length).toEqual(25)
  })
})
