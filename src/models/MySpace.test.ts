import { MongoClient, Db, ObjectId } from 'mongodb'

import User from './User'
import { MySpaceModel } from './MySpace'

import type { Widget } from 'types/index'
import { WIDGETS, WIDGET_TYPES } from 'constants/index'
import { exampleCollection } from '__fixtures__/newPortalUser'

let connection: typeof MongoClient
let db: typeof Db

describe('My Space model', () => {
  const testUserId = 'testUserId'

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = await connection.db()

    // Clean up db
    await db.collection('users').deleteMany({})

    // Create a test user
    // MySpace Data: FeaturedShortcuts, GuardianIdeal, Example Collection
    const displayName = 'Floyd King'
    const theme = 'light'
    await User.createOne(testUserId, [exampleCollection], displayName, theme, {
      db,
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  test('can get all widgets in a user’s My Space', async () => {
    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    // Data: FeaturedShortcuts, GuardianIdeal, Example Collection
    expect(all).toHaveLength(3)
  })

  test('throws an error if user is not found', async () => {
    await expect(
      MySpaceModel.get({ userId: 'not a user' }, { db })
    ).rejects.toThrow()
  })

  test('can add a News widget', async () => {
    const created = (await MySpaceModel.addWidget(
      { userId: testUserId, title: 'Recent news', type: 'News' },
      { db }
    )) as Widget

    expect(created.title).toEqual('Recent news')
    expect(created.type).toEqual('News')
    expect(created).toHaveProperty('_id')

    const all = await MySpaceModel.get({ userId: testUserId }, { db })

    // Data: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    expect(all).toHaveLength(4)
  })

  test('can remove default Guardian Ideal widget', async () => {
    // Beginning Data: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    let allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })

    let guardianIdealWidget = allWidgets.find(
      (s) => s.type === WIDGETS.GUARDIANIDEAL.type
    )

    expect(guardianIdealWidget).toBeTruthy()

    if (guardianIdealWidget) {
      await MySpaceModel.deleteWidget(
        { _id: guardianIdealWidget._id, userId: testUserId },
        { db }
      )

      allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })
      guardianIdealWidget = allWidgets.find(
        (s) => s.type === WIDGET_TYPES.GUARDIANIDEAL
      )
      expect(guardianIdealWidget).toBe(undefined)
      // End Data: FeaturedShortcuts, Example Collection, News
    }
  })

  test('can add a Guardian Ideal widget', async () => {
    // Beginning Data: FeaturedShortcuts, Example Collection, News
    const created = (await MySpaceModel.addWidget(
      {
        userId: testUserId,
        title: WIDGETS.GUARDIANIDEAL.title,
        type: WIDGETS.GUARDIANIDEAL.type,
      },
      { db }
    )) as Widget

    expect(created.title).toEqual(WIDGETS.GUARDIANIDEAL.title)
    expect(created.type).toEqual(WIDGETS.GUARDIANIDEAL.type)
    expect(created).toHaveProperty('_id')

    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    // End: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    expect(all).toHaveLength(4)
  })

  test('can remove default Featured Shortcuts widget', async () => {
    // Beginning Data: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    let allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })

    let featuredShortcutsWidget = allWidgets.find(
      (s) => s.type === WIDGETS.FEATUREDSHORTCUTS.type
    )

    expect(featuredShortcutsWidget).toBeTruthy()

    if (featuredShortcutsWidget) {
      await MySpaceModel.deleteWidget(
        { _id: featuredShortcutsWidget._id, userId: testUserId },
        { db }
      )

      allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })
      featuredShortcutsWidget = allWidgets.find(
        (s) => s.type === WIDGET_TYPES.FEATUREDSHORTCUTS
      )
      expect(featuredShortcutsWidget).toBe(undefined)
      // End Data: GuardianIdeal, Example Collection, News
    }
  })

  test('can add a Featured Shortcut widget', async () => {
    // Beginning Data: GuardianIdeal, Example Collection, News
    const created = (await MySpaceModel.addWidget(
      {
        userId: testUserId,
        title: 'Featured Shortcuts',
        type: 'FeaturedShortcuts',
      },
      { db }
    )) as Widget

    expect(created.title).toEqual('Featured Shortcuts')
    expect(created.type).toEqual('FeaturedShortcuts')
    expect(created).toHaveProperty('_id')

    const all = await MySpaceModel.get({ userId: testUserId }, { db })
    // End Data: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    expect(all).toHaveLength(4)
  })

  test('cannot add a News widget if there already is one', async () => {
    expect(
      MySpaceModel.addWidget(
        { userId: testUserId, title: 'Recent news', type: 'News' },
        { db }
      )
    ).rejects.toThrow(new Error('You can only have one News widget'))
  })

  test('cannot add a Guardian Ideal widget if there already is one', async () => {
    expect(
      MySpaceModel.addWidget(
        {
          userId: testUserId,
          title: WIDGETS.GUARDIANIDEAL.title,
          type: WIDGETS.GUARDIANIDEAL.type,
        },
        { db }
      )
    ).rejects.toThrow(new Error('You can only have one Guardian Ideal widget'))
  })

  test('cannot add a Featured Shortcut widget if there already is one', async () => {
    expect(
      MySpaceModel.addWidget(
        {
          userId: testUserId,
          title: 'Featured Shortcuts',
          type: 'FeaturedShortcuts',
        },
        { db }
      )
    ).rejects.toThrow(
      new Error('You can only have one Featured Shortcuts widget')
    )
  })

  test('throws an error if widget cannot be added', async () => {
    await expect(
      MySpaceModel.addWidget(
        { userId: 'wrong user id', title: 'Recent news', type: 'News' },
        { db }
      )
    ).rejects.toThrow()
  })
  test('can remove a News widget', async () => {
    // Beginning Data: FeaturedShortcuts, GuardianIdeal, Example Collection, News
    let allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })

    let newsWidget = allWidgets.find((s) => s.type === 'News')

    expect(newsWidget).toBeTruthy()

    if (newsWidget) {
      await MySpaceModel.deleteWidget(
        { _id: newsWidget._id, userId: testUserId },
        { db }
      )

      allWidgets = await MySpaceModel.get({ userId: testUserId }, { db })
      newsWidget = allWidgets.find((s) => s.type === 'News')
      // Beginning Data: FeaturedShortcuts, GuardianIdeal, Example Collection
      expect(newsWidget).toBe(undefined)
    }
  })

  test('throws an error if cannot find user or widget to remove', async () => {
    await expect(
      MySpaceModel.deleteWidget({ _id: ObjectId(), userId: 'cat' }, { db })
    ).rejects.toThrow()
  })

  test('can update widget order', async () => {
    const originalOrder = await MySpaceModel.get({ userId: testUserId }, { db })

    // Clone the array
    const newOrder = Array.from(originalOrder)
    // Move last item to first position
    newOrder.unshift(newOrder.pop() as Widget)

    const updated = await MySpaceModel.updateWidgetOrder(
      { userId: testUserId, items: newOrder },
      { db }
    )

    expect(updated).toBe(newOrder)
    expect(updated).not.toBe(originalOrder)
  })
})
