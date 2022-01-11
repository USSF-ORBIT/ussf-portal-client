import { MongoClient, Db } from 'mongodb'
import User from './User'
import { CollectionModel } from './Collection'
import { CollectionInput, CollectionRecords } from 'types'

let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: string
let testUserId: string

let manyCollections: CollectionRecords

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

    // Create many collections
    manyCollections = [
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
      // {
      //   id: 'testCmsId24',
      //   title: 'CMS Collection 24',
      //   bookmarks: [],
      // },
      // {
      //   id: 'testCmsId25',
      //   title: 'CMS Collection 25',
      //   bookmarks: [],
      // },
    ]
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
  it('cannot add more than 25 collections using addMany', async () => {
    const addCollections: CollectionRecords = [
      ...manyCollections,
      {
        id: 'testCmsId24',
        title: 'CMS Collection 24',
        bookmarks: [],
      },
      {
        id: 'testCmsId25',
        title: 'CMS Collection 25',
        bookmarks: [],
      },
    ]
    const error = await CollectionModel.addMany(addCollections, db, testUserId)

    const all = await CollectionModel.getAll(testUserId, db)

    expect(error).toBeInstanceOf(Error)
    expect(all.length).toBeLessThan(25)
  })

  it('cannot go over 25 collections limit using addOne', async () => {
    // add bulk collections using addMany

    let all = await CollectionModel.addMany(manyCollections, db, testUserId)
    // should add one return all collections if successful?
    await CollectionModel.addOne('CMS Collection 26', [], db, testUserId)

    all = await CollectionModel.getAll(testUserId, db)

    expect(all.length).toEqual(25)

    const error = await CollectionModel.addOne(
      'CMS Collection 27',
      [],
      db,
      testUserId
    )

    expect(error).toBeInstanceOf(Error)
  })
})
