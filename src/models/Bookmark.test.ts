import { ObjectId } from 'bson'
import { MongoClient, Db } from 'mongodb'
import type { BookmarkInput, Collection } from 'types'

import { exampleCollection1 } from '../__fixtures__/newPortalUser'
import { BookmarkModel } from './Bookmark'
import { CollectionModel } from './Collection'
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

  it('can create and find a bookmark', async () => {
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
      db,
      'testUserId',
      newBookmark.label,
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
  })

  it('can get all bookmarks in a single collection', async () => {
    const bookmarks = await BookmarkModel.getAllCollectionBookmarks(
      exampleCollectionId,
      db
    )
    expect(bookmarks).toHaveLength(7)
  })

  it('cannot add a bookmark if reached max limit of 10', async () => {
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

    const all = await BookmarkModel.getAllCollectionBookmarks(
      newCollection._id,
      db
    )

    expect(error).toBeInstanceOf(Error)
    expect(all.length).toBeLessThanOrEqual(10)
  })
})
