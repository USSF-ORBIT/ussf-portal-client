import type { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import { ObjectId as ObjectIdType } from 'bson'
import type { MySpace, Widget, WidgetType } from 'types'

// #TODO These types should be revisited when we add codegen to resolvers
type GetInput = {
  userId: string
}

type AddWidgetInput = {
  userId: string
  title: string
  type: WidgetType
}

type DeleteWidgetInput = {
  userId: string
  _id: ObjectIdType
}

/** My Space */
export const MySpaceModel = {
  async get({ userId }: GetInput, { db }: Context): Promise<MySpace> {
    try {
      const user = await db.collection('users').findOne({ userId })
      return user.mySpace
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('MySpaceModel Error: error in get', e)
      throw e
    }
  },

  async addWidget(
    { userId, title, type }: AddWidgetInput,
    { db }: Context
  ): Promise<Widget> {
    // For now, can only have one News widget
    if (type === 'News') {
      const allWidgets = await this.get({ userId }, { db })
      const newsWidget = allWidgets.find((s: Widget) => s.type === 'News')
      if (newsWidget) throw new Error('You can only have one News section')
    }

    if (type === 'GuardianIdeal') {
      const allWidgets = await this.get({ userId }, { db })
      const guardianIdealWidget = allWidgets.find(
        (s: Widget) => s.type === 'GuardianIdeal'
      )
      if (guardianIdealWidget)
        throw new Error('You can only have one Guardian Ideal section')
    }

    if (type === 'FeaturedShortcuts') {
      const allWidgets = await this.get({ userId }, { db })
      const featuredShortcutsWidget = allWidgets.find(
        (s: Widget) => s.type === 'FeaturedShortcuts'
      )
      if (featuredShortcutsWidget)
        throw new Error('You can only have one Featured Shortcuts section')
    }

    const created: Widget = {
      _id: ObjectId(),
      title,
      type,
    }

    try {
      // For now, if the type is GuardianIdeal, we want it at the front of the
      // user collection array.
      if (type === 'GuardianIdeal') {
        await db
          .collection('users')
          .updateOne(
            { userId },
            { $push: { mySpace: { $each: [created], $position: 0 } } }
          )
      } else if (type === 'FeaturedShortcuts') {
        await db
          .collection('users')
          .updateOne(
            { userId },
            { $push: { mySpace: { $each: [created], $position: 1 } } }
          )
      } else {
        await db
          .collection('users')
          .updateOne({ userId }, { $push: { mySpace: created } })
      }

      return created
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('MySpaceModel Error: error in addOne', e)
      throw e
    }
  },

  async deleteWidget(
    { _id, userId }: DeleteWidgetInput,
    { db }: Context
  ): Promise<{ _id: ObjectIdType; type: WidgetType }> {
    try {
      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { userId },
          { $pull: { mySpace: { _id: _id } } },
          { returnDocument: 'after' }
        )

      if (result.value === null)
        throw new Error('MySpaceModel Error: Document not updated')
      return { _id, type: 'News' }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('MySpaceModel Error: error in deleteOne', e)
      throw e
    }
  },
}
