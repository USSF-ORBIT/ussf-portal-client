import { MongoClient, Db, ObjectId } from 'mongodb'
import { ObjectId as ObjectIdType } from 'bson'

import { exampleCollection } from '../__fixtures__/newPortalUser'
import { BookmarkModel, RemoveOneResult } from './Bookmark'
import { CollectionModel } from './Collection'
import User from './User'
import type { Bookmark, BookmarkModelInput, Collection } from 'types'

let connection: typeof MongoClient
let db: typeof Db
let exampleCollectionId: ObjectIdType

describe('Bookmark Model', () => {
  let newCMSBookmarkId: ObjectIdType
  let newCustomBookmarkId: ObjectIdType

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
    const displayName = 'Floyd King'
    const theme = 'light'
    await User.createOne(testUserId, [exampleCollection], displayName, theme, {
      db,
    })
    const testUser = await User.findOne(testUserId, { db })

    // Test user comes with an example widgets
    // Default MySpace: [FeaturedShortcuts, GuardianIdeal, Example Collection]
    exampleCollectionId = testUser.mySpace[2]._id
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can create and find a CMS bookmark', async () => {
    // Start Data: Test User, 1 collection, 5 bookmarks
    // End Data: Test User, 1 collection, 6 bookmarks
    const newBookmark = {
      url: 'https://www.example.com',
      label: 'Example Bookmark',
      cmsId: 'testCmsId',
    }
    const created = await BookmarkModel.addOne(
      {
        collectionId: exampleCollectionId,
        url: newBookmark.url,
        userId: 'testUserId',
        label: newBookmark.label,
        cmsId: newBookmark.cmsId,
      },
      {
        db,
      }
    )
    const found = await BookmarkModel.findOne(
      { _id: created._id, collectionId: exampleCollectionId },
      { db }
    )

    expect(found).toEqual(created)

    newCMSBookmarkId = created._id

    const all = await BookmarkModel.getAllInCollection(
      { collectionId: exampleCollectionId },
      { db }
    )
    expect(all.length).toEqual(6)
  })

  it('throws an error if it encounters an error when finding a bookmark', async () => {
    await expect(
      BookmarkModel.findOne(
        { _id: ObjectId(), collectionId: exampleCollectionId },
        { db: null }
      )
    ).rejects.toThrow()
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
      {
        collectionId: exampleCollectionId,
        url: newBookmark.url,
        userId: 'testUserId',
        label: newBookmark.label,
        cmsId: newBookmark.cmsId,
      },
      {
        db,
      }
    )

    expect(created.cmsId).toEqual(newBookmark.cmsId)
    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)

    const hidden: RemoveOneResult = await BookmarkModel.hideOne(
      {
        _id: created._id,
        collectionId: exampleCollectionId,
        userId: 'testUserId',
      },
      { db }
    )

    const all = await BookmarkModel.getAllInCollection(
      { collectionId: exampleCollectionId },
      { db }
    )
    expect(all.length).toEqual(7)

    const found = all.find((b: Bookmark) => `${b._id}` === `${hidden._id}`)

    expect(found.isRemoved).toBe(true)
  })

  it('throws an error if it encounters an error when hiding a bookmark', async () => {
    await expect(
      BookmarkModel.hideOne(
        {
          _id: ObjectId(),
          collectionId: exampleCollectionId,
          userId: 'testUserId',
        },
        { db: null }
      )
    ).rejects.toThrow()
  })

  it('cannot edit a bookmark with cmsId', async () => {
    const existingBookmark = await BookmarkModel.findOne(
      {
        _id: newCMSBookmarkId,
        collectionId: exampleCollectionId,
      },
      { db }
    )

    const changedValues = {
      url: 'https://www.gmail.com',
      label: 'Gmail',
    }

    expect(
      BookmarkModel.editOne(
        {
          _id: existingBookmark._id,
          collectionId: exampleCollectionId,
          userId: 'testUserId',
          ...changedValues,
        },
        { db }
      )
    ).rejects.toThrow('You cannot edit a bookmark copied from the CMS')
  })

  it('can create and delete a new bookmark without a cmsId', async () => {
    // Start Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    // End Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
    }

    const created = await BookmarkModel.addOne(
      {
        collectionId: exampleCollectionId,
        url: newBookmark.url,
        userId: 'testUserId',
        label: newBookmark.label,
      },

      { db }
    )

    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)

    const allAdded = await BookmarkModel.getAllInCollection(
      { collectionId: exampleCollectionId },
      { db }
    )
    expect(allAdded.length).toEqual(8)

    await BookmarkModel.deleteOne(
      {
        _id: created._id,
        collectionId: exampleCollectionId,
        userId: 'testUserId',
      },
      { db }
    )

    const deleted = await BookmarkModel.findOne(
      { _id: created._id, collectionId: exampleCollectionId },
      { db }
    )

    expect(deleted.length).toBe(0)

    const all = await BookmarkModel.getAllInCollection(
      { collectionId: exampleCollectionId },
      { db }
    )
    expect(all.length).toEqual(7)
  })

  it('throws an error if it encounters an error when deleting a bookmark', async () => {
    await expect(
      BookmarkModel.deleteOne(
        {
          _id: ObjectId(),
          collectionId: exampleCollectionId,
          userId: 'testUserId',
        },
        { db: null }
      )
    ).rejects.toThrow()
  })
  it('can create and edit a new bookmark without a cmsId', async () => {
    // Start Data: Test User, 1 collection, 7 bookmarks (1 isRemoved)
    // End Data: Test User, 1 collection, 8 bookmarks (1 isRemoved)
    const newBookmark = {
      url: 'https://www.google.com',
      label: 'Google',
    }

    const created = await BookmarkModel.addOne(
      {
        collectionId: exampleCollectionId,
        url: newBookmark.url,
        userId: 'testUserId',
        label: newBookmark.label,
      },

      { db }
    )

    expect(created.label).toEqual(newBookmark.label)
    expect(created.url).toEqual(newBookmark.url)

    newCustomBookmarkId = created._id

    const changedValues = {
      url: 'https://www.gmail.com',
      label: 'Gmail',
    }

    await BookmarkModel.editOne(
      {
        _id: created._id,
        collectionId: exampleCollectionId,
        userId: 'testUserId',
        ...changedValues,
      },
      { db }
    )

    const edited = await BookmarkModel.findOne(
      { _id: created._id, collectionId: exampleCollectionId },
      { db }
    )

    expect(edited.label).toEqual(changedValues.label)
    expect(edited.url).toEqual(changedValues.url)
  })

  it('can edit just the URL of a bookmark', async () => {
    const existingBookmark = await BookmarkModel.findOne(
      {
        _id: newCustomBookmarkId,
        collectionId: exampleCollectionId,
      },
      { db }
    )

    const changedValues = {
      url: 'https://www.webmail.com',
    }

    await BookmarkModel.editOne(
      {
        _id: existingBookmark._id,
        collectionId: exampleCollectionId,
        userId: 'testUserId',
        ...changedValues,
      },
      { db }
    )

    const edited = await BookmarkModel.findOne(
      { _id: existingBookmark._id, collectionId: exampleCollectionId },
      { db }
    )

    expect(edited.label).toEqual(existingBookmark.label)
    expect(edited.url).toEqual(changedValues.url)
  })

  it('can edit just the label of a bookmark', async () => {
    const existingBookmark = await BookmarkModel.findOne(
      {
        _id: newCustomBookmarkId,
        collectionId: exampleCollectionId,
      },
      { db }
    )

    const changedValues = {
      label: 'Webmail',
    }

    await BookmarkModel.editOne(
      {
        _id: existingBookmark._id,
        collectionId: exampleCollectionId,
        userId: 'testUserId',
        ...changedValues,
      },
      { db }
    )

    const edited = await BookmarkModel.findOne(
      { _id: existingBookmark._id, collectionId: exampleCollectionId },
      { db }
    )

    expect(edited.label).toEqual(changedValues.label)
    expect(edited.url).toEqual(existingBookmark.url)
  })

  it('can get all bookmarks in a single collection', async () => {
    // Start Data: Test User, 1 collection, 8 bookmarks (1 isRemoved)
    // End Data: Test User, 1 collection, 8 bookmarks (1 isRemoved)
    const bookmarks = await BookmarkModel.getAllInCollection(
      { collectionId: exampleCollectionId },
      { db }
    )

    expect(bookmarks).toHaveLength(8)
  })

  it('returns an empty array if no bookmarks are found', async () => {
    const bookmarks = await BookmarkModel.getAllInCollection(
      { collectionId: ObjectId() },
      { db }
    )
    expect(bookmarks).toHaveLength(0)
  })

  it('throws an error if it encounters an error', async () => {
    await expect(
      BookmarkModel.getAllInCollection(
        { collectionId: ObjectId() },
        { db: null }
      )
    ).rejects.toThrow()
  })

  it('cannot add a bookmark if reached max limit of 10', async () => {
    // Start Data: Test User, 1 collection, 8 bookmarks (1 isRemoved)
    // Create 1 new collection with 10 bookmarks
    // Add 1 new bookmark to that collection
    // End Data: Test User, 1 new collection with 10 bookmarks

    // Create full collection
    const maxBookmarks: BookmarkModelInput[] = [
      {
        _id: ObjectId(),
        url: 'https://www.example1.com',
        label: 'Label 1',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example2.com',
        label: 'Label 2',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example3.com',
        label: 'Label 3',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example4.com',
        label: 'Label 4',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example5.com',
        label: 'Label 5',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example6.com',
        label: 'Label 6',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example7.com',
        label: 'Label 7',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example8.com',
        label: 'Label 8',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example9.com',
        label: 'Label 9',
      },
      {
        _id: ObjectId(),
        url: 'https://www.example10.com',
        label: 'Label 10',
      },
    ]

    const newCollection = (await CollectionModel.addOne(
      {
        title: 'Max Collection',
        bookmarks: maxBookmarks,
        userId: 'testUserId',
      },
      { db }
    )) as Collection

    // Should match length before attempting to add
    expect(newCollection.bookmarks).toHaveLength(10)

    const error = await BookmarkModel.addOne(
      {
        collectionId: newCollection._id,
        url: 'https://www.example11.com',
        userId: 'testUserId',
        label: 'Label 11',
      },
      { db }
    )

    const all = await BookmarkModel.getAllInCollection(
      { collectionId: newCollection._id },
      { db }
    )

    expect(error).toBeInstanceOf(Error)
    expect(all.length).toBe(10)
  })

  it('throws an error if it encounters an error when adding a bookmark', async () => {
    await expect(
      BookmarkModel.addOne(
        {
          collectionId: exampleCollectionId,
          userId: 'testUserId',
          url: 'https://www.example11.com',
          label: 'Label 11',
        },
        { db: null }
      )
    ).rejects.toThrow()
  })
})
