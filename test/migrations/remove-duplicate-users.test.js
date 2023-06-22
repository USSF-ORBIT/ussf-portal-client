import { ObjectId } from 'mongodb'

import { connectDb } from '../../utils/mongodb'

import { up, down } from '../../migrations/1686078533740-remove-duplicate-users'

const TESTUSER1 = 'user1'
const TEST_ACCOUNT = [
  {
    _id: ObjectId(),
    userId: TESTUSER1,
    mySpace: [
      {
        _id: ObjectId(),
        title: 'Featured Shortcuts',
        type: 'FeaturedShortcuts',
      },
      {
        _id: ObjectId(),
        title: 'Guardian Ideal',
        type: 'GuardianIdeal',
      },
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
        title: 'Collection One',
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
    ],
    displayName: 'USER ONE',
    theme: 'light',
  },
]

const TEST_ACCOUNT_COPY = [
  {
    _id: ObjectId(),
    userId: TESTUSER1,
    mySpace: [
      {
        _id: ObjectId(),
        title: 'Featured Shortcuts',
        type: 'FeaturedShortcuts',
      },
      {
        _id: ObjectId(),
        title: 'Guardian Ideal',
        type: 'GuardianIdeal',
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
    displayName: 'USER COPY',
    theme: 'dark',
  },
]

const ANOTHER_TEST_ACCOUNT_COPY = [
  {
    _id: ObjectId(),
    userId: TESTUSER1,
    mySpace: [
      {
        _id: ObjectId(),
        title: 'Featured Shortcuts',
        type: 'FeaturedShortcuts',
      },
      {
        _id: ObjectId(),
        title: 'Guardian Ideal',
        type: 'GuardianIdeal',
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
      {
        _id: ObjectId(),
        title: 'Custom Collection',
        type: 'Collection',
        bookmarks: [
          {
            _id: ObjectId(),
            cmsId: 'cktd7c0d30190w597qoftevq1',
            url: 'https://afpcsecure.us.af.mil/',
            label: 'vMPF',
          },
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
    displayName: 'ANOTHER USER COPY',
    theme: 'light',
  },
]

const UNINVOLVED_USER = [
  {
    _id: ObjectId(),
    userId: 'anotherUser',
    mySpace: [
      {
        _id: ObjectId(),
        title: 'Featured Shortcuts',
        type: 'FeaturedShortcuts',
      },
      {
        _id: ObjectId(),
        title: 'Guardian Ideal',
        type: 'GuardianIdeal',
      },
      {
        _id: ObjectId(),
        cmsId: 'ckwz3u58s1835ql974leo1yll',
        title: 'Example Collection',
        type: 'Collection',
        bookmarks: [
          {
            _id: ObjectId(),
            cmsId: 'ckwz3u4461813ql970wkd254m',
            url: 'https://www.e-publishing.af.mil/',
            label: 'e-Publications',
          },
        ],
      },
    ],
    displayName: 'UNINVOLVED USER',
    theme: 'dark',
  },
]

describe('[Migration: Remove Duplicate Users]', () => {
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

    // Seed db with duplicate users
    await db.collection('users').insertMany(TEST_ACCOUNT)
    await db.collection('users').insertMany(TEST_ACCOUNT_COPY)
    await db.collection('users').insertMany(ANOTHER_TEST_ACCOUNT_COPY)
    await db.collection('users').insertMany(UNINVOLVED_USER)
  })

  afterAll(async () => {
    await connection.close()
  })

  test('up', async () => {
    // Find the duplicate users
    let users = await db.collection('users').find({ userId: TESTUSER1 })
    users = await users.toArray()
    expect(users).toHaveLength(3)

    // Check that both users have the same userId
    expect(users[0].userId).toEqual(users[1].userId)

    // Remove the duplicate users
    await up()

    // Find the remaining user
    users = await db.collection('users').find({ userId: TESTUSER1 })
    users = await users.toArray()
    expect(users).toHaveLength(1)

    // Remaining user should have the merged mySpace
    expect(users[0].mySpace).toHaveLength(7)
    expect(users[0].displayName).toEqual('USER ONE')
    expect(users[0].theme).toEqual('dark')
    expect(
      users[0].mySpace.filter((item) => item.type === 'FeaturedShortcuts')
    ).toHaveLength(1)
    expect(
      users[0].mySpace.filter((item) => item.type === 'GuardianIdeal')
    ).toHaveLength(1)

    // Throw an error if there is an attempt to create a new user with the same userId as an existing user
    await expect(
      db.collection('users').insertOne({
        userId: TESTUSER1,
        mySpace: [],
        displayName: 'I SHOULD NOT WORK',
        theme: 'light',
      })
    ).rejects.toThrow()
  })

  test('down', async () => {
    const downMock = jest.fn()

    down(downMock)

    expect(downMock).toHaveBeenCalledTimes(1)
  })
})
