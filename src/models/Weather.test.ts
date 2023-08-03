import { MongoClient, Db } from 'mongodb'
import { ObjectId as ObjectIdType } from 'bson'
import User from './User'
import { WeatherModel } from './Weather'
import { MySpaceModel } from './MySpace'
import { PortalUser } from 'types'
import {
  exampleWeatherWidget1,
  exampleWeatherWidget2,
  exampleCollection,
} from '__fixtures__/newPortalUser'

let connection: typeof MongoClient
let db: typeof Db
let testUserId: string

describe('Weather model', () => {
  let testUser: PortalUser
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
    const displayName = 'Floyd King'
    const theme = 'light'
    await User.createOne(testUserId, [exampleCollection], displayName, theme, {
      db,
    })
    testUser = await User.findOne(testUserId, { db })
    // Default MySpace: [FeaturedShortcuts, GuardianIdeal, Example Collection]
  })

  afterAll(async () => {
    await connection.close()
  })

  it('can add a weather widget to My Space', async () => {
    // Start Data: Default MySpace: [FeaturedShortcuts, GuardianIdeal, Example Collection]
    // End Data: [FeaturedShortcuts, GuardianIdeal, Example Collection, Weather Widget 90210]
    await WeatherModel.addOne(
      {
        coords: exampleWeatherWidget1.coords,
        userId: testUserId,
      },
      { db }
    )

    const all = await MySpaceModel.get({ userId: testUserId }, { db })

    expect(all).toHaveLength(4)
    expect(all).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          coords: exampleWeatherWidget1.coords,
        }),
      ])
    )
  })

  it('throws an error if cannot add a weather widget to My Space', async () => {
    await expect(
      WeatherModel.addOne(
        {
          coords: exampleWeatherWidget1.coords,
          userId: 'fakeUserIdsss',
        },
        { db }
      )
    ).rejects.toThrow()
  })

  it('can edit a weather widget', async () => {
    // Start Data: Default MySpace: [FeaturedShortcuts, GuardianIdeal, Example Collection]
    // End Data: [FeaturedShortcuts, GuardianIdeal, Example Collection, Weather Widget 99553]
    testUser = await User.findOne(testUserId, { db })

    await WeatherModel.editOne(
      {
        _id: testUser.mySpace[3]._id,
        coords: exampleWeatherWidget2.coords,
        userId: testUserId,
      },
      { db }
    )
    const all = await MySpaceModel.get({ userId: testUserId }, { db })

    expect(all).toHaveLength(4)
    expect(all).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          coords: exampleWeatherWidget2.coords,
        }),
      ])
    )
  })

  it('throws an error if cannot edit a weather widget', async () => {
    await expect(
      WeatherModel.editOne(
        {
          _id: testUser.mySpace[3]._id,
          coords: exampleWeatherWidget2.coords,
          userId: 'fakeUserId',
        },
        { db }
      )
    ).rejects.toThrow()
  })
})
