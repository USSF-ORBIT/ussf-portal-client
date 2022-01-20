import { ObjectId } from 'bson'
import { MongoClient, Db } from 'mongodb'
import { BookmarkModel } from './Bookmark'
import { CollectionModel } from './Collection'
import User from './User'
import type { BookmarkInput, Collection, RemovedBookmark } from 'types'
let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: string

describe('Bookmark Model', () => {
  beforeAll(async () => {
    // Create mongodb connection
    // Create Test User with 1 collection, 5 bookmarks
    // Store collection id to use for all tests

    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()

    // Clean db before running test suite
    await db.collection('users').deleteMany({})

    // Create test user
    const testUserId = 'testUserId'
    await User.createOne(testUserId, { db })
    const testUser = await User.findOne(testUserId, { db })

    // Test user comes with an example collection
    exampleCollectionId = testUser.mySpace[0]._id
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can create and find a bookmark', async () => {
    // Start Data: Test User, 1 collection, 5 bookmarks
    // End Data: Test User, 1 collection, 6 bookmarks
    const newBookmark = {
      url: 'https://www.example.com',
      label: 'Example Bookmark',
      cmsId: 'testCmsId',
    }
    const created = await BookmarkModel.addOne(
      exampleCollectionId,
      newBookmark.url,
      db,
      'testUserId',
      newBookmark.label,
      newBookmark.cmsId
    )
    const found = await BookmarkModel.findOne(
      created._id,
      exampleCollectionId,
      db
    )

    expect(found).toEqual(created)

    const all = await BookmarkModel.getAllInCollection(exampleCollectionId, db)
    expect(all.length).toEqual(6)
  })

  it('can create and hide a new bookmark with cmsId', async () => {
    // Start Data: Test User, 1 collection, 6 bookmarks
    // End Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
      cmsId: 'testCmsId',
    }

    const created = await BookmarkModel.addOne(
      exampleCollectionId,
      newBookmark.url,
      db,
      'testUserId',
      newBookmark.label,
      newBookmark.cmsId
    )

    expect(created.cmsId).toEqual(newBookmark.cmsId)
    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)

    const hidden: RemovedBookmark = await BookmarkModel.hideOne(
      created._id,
      exampleCollectionId,
      db,
      'testUserId'
    )

    const all = await BookmarkModel.getAllInCollection(exampleCollectionId, db)
    expect(all.length).toEqual(7)

    const found = all.find((b: any) => `${b._id}` === `${hidden._id}`)

    expect(found.isRemoved).toBe(true)
  })

  it('can create and delete a new bookmark without a cmsId', async () => {
    // Start Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    // End Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
    }

    const created = await BookmarkModel.addOne(
      exampleCollectionId,
      newBookmark.url,
      db,
      'testUserId',
      newBookmark.label
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

    expect(deleted.length).toBe(0)

    const all = await BookmarkModel.getAllInCollection(exampleCollectionId, db)
    expect(all.length).toEqual(7)
  })

  it('can get all bookmarks in a single collection', async () => {
    // Start Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    // End Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    const bookmarks = await BookmarkModel.getAllInCollection(
      exampleCollectionId,
      db
    )

    expect(bookmarks).toHaveLength(7)
  })

  it('cannot add a bookmark if reached max limit of 10', async () => {
    // Start Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    // Create 1 new collection with 10 bookmarks
    // Add 1 new bookmark to that collection
    // End Data: Test User, 1 new collection with 10 bookmarks

    // Create full collection
    const maxBookmarks: BookmarkInput[] = [
      {
        _id: new ObjectId(),
        url: 'https://www.example1.com',
        label: 'Label 1',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example2.com',
        label: 'Label 2',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example3.com',
        label: 'Label 3',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example4.com',
        label: 'Label 4',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example5.com',
        label: 'Label 5',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example6.com',
        label: 'Label 6',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example7.com',
        label: 'Label 7',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example8.com',
        label: 'Label 8',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example9.com',
        label: 'Label 9',
      },
      {
        _id: new ObjectId(),
        url: 'https://www.example10.com',
        label: 'Label 10',
      },
    ]

    const newCollection = (await CollectionModel.addOne(
      'Max Collection',
      maxBookmarks,
      db,
      'testUserId'
    )) as Collection

    // Should match length before attempting to add
    expect(newCollection.bookmarks).toHaveLength(10)

    const error = await BookmarkModel.addOne(
      newCollection._id,
      'https://www.example11.com',
      db,
      'testUserId',
      'Label 11'
    )

    const all = await BookmarkModel.getAllInCollection(newCollection._id, db)

    expect(error).toBeInstanceOf(Error)
    expect(all.length).toBe(10)
  })
})
