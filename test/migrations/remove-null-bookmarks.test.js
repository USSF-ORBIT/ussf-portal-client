import { ObjectId } from 'mongodb'

import { connectDb } from '../../utils/mongodb'

import { up, down } from '../../migrations/1680214667334-remove-null-bookmarks'

const TESTUSER1 = 'user1'
const TEST_ACCOUNT_WITH_NULL_BOOKMARKS = [
  {
    _id: ObjectId(),
    userId: TESTUSER1,
    mySpace: [
      {
        _id: ObjectId(),
        cmsId: 'ckwz3u58s1835ql974leo1yll',
        title: 'Empty Collection',
        type: 'Collection',
        bookmarks: [],
      },
      {
        _id: ObjectId(),
        cmsId: 'ckwz3u58s1835ql974leo1yll',
        title: 'A Collection',
        type: 'Collection',
        bookmarks: [
          {
            _id: ObjectId(),
            cmsId: 'cktd7c0d30190w597qoftevq1',
            url: 'https://afpcsecure.us.af.mil/',
            label: 'vMPF',
          },
        ],
      },
      {
        _id: ObjectId(),
        cmsId: 'ckwz3u58s1835ql974leo1yll',
        title: 'Example Collection',
        type: 'Collection',
        bookmarks: [
          {
            _id: ObjectId(),
            cmsId: 'cktd7c0d30190w597qoftevq1',
            url: 'https://afpcsecure.us.af.mil/',
            label: 'vMPF',
          },
          null,
          {
            _id: ObjectId(),
            cmsId: 'cktd7ettn0457w597p7ja4uye',
            url: 'https://leave.af.mil/profile',
            label: 'LeaveWeb',
          },
          {
            _id: ObjectId(),
            cmsId: 'cktd7hjz30636w5977vu4la4c',
            url: 'https://mypay.dfas.mil/#/',
            label: 'MyPay',
          },
          null,
          {
            _id: ObjectId(),
            cmsId: 'ckwz3tphw1763ql97pia1zkvc',
            url: 'https://webmail.apps.mil/',
            label: 'Webmail',
          },
          {
            _id: ObjectId(),
            cmsId: 'ckwz3u4461813ql970wkd254m',
            url: 'https://www.e-publishing.af.mil/',
            label: 'e-Publications',
          },
        ],
      },
    ],
    displayName: 'USER ONE',
    theme: 'light',
  },
]

describe('[Migration: Remove Null Bookmarks]', () => {
  let connection
  let db

  beforeAll(async () => {
    // This is NOT the connection used in the migration itself
    // Just use to seed data for the test
    const mongoConnection = await connectDb()
    connection = mongoConnection.connection
    db = mongoConnection.db

    // Reset db
    await db.collection('users').deleteMany({})

    // Create a test user (with one default collection)
    await db.collection('users').insertMany(TEST_ACCOUNT_WITH_NULL_BOOKMARKS)
  })

  afterAll(async () => {
    await connection.close()
  })

  test('up', async () => {
    let user = await db.collection('users').findOne({ userId: TESTUSER1 })

    // user data should have a null bookmark to remove
    let foundNull = user.mySpace.reduce((found, c) => {
      const nullBookmarks = c.bookmarks.filter((b) => b === null)
      return nullBookmarks.length > 0
    }, false)

    expect(foundNull).toBe(true)
    expect(user.mySpace.length).toBe(3)
    expect(user.mySpace[0].bookmarks.length).toBe(0)
    expect(user.mySpace[1].bookmarks.length).toBe(1)
    expect(user.mySpace[2].bookmarks.length).toBe(7)

    // remove the null bookmarks
    await up()

    user = await db.collection('users').findOne({ userId: TESTUSER1 })

    // check that there are no nulls
    foundNull = user.mySpace.reduce((found, c) => {
      const nullBookmarks = c.bookmarks.filter((b) => b === null)
      return nullBookmarks.length > 0
    }, false)

    expect(foundNull).toBe(false)
    expect(user.mySpace.length).toBe(3)
    expect(user.mySpace[0].bookmarks.length).toBe(0)
    expect(user.mySpace[1].bookmarks.length).toBe(1)
    expect(user.mySpace[2].bookmarks.length).toBe(5)
  })

  test('down', async () => {
    const downMock = jest.fn()

    await down(downMock)

    expect(downMock).toHaveBeenCalledTimes(1)
  })
})
