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
      console.error('MySpaceModel Error: error in get', e)
      throw e
    }
  },

  async addWidget(
    { userId, title, type }: AddWidgetInput,
    { db }: Context
  ): Promise<Widget> {
    // Fetch all widgets so we can add new widgets in the correct order
    const allWidgets = await this.get({ userId }, { db })
    const guardianIdealWidget = allWidgets.find(
      (s: Widget) => s.type === 'GuardianIdeal'
    )
    const featuredShortcutsWidget = allWidgets.find(
      (s: Widget) => s.type === 'FeaturedShortcuts'
    )

    // For now, can only have one each of News, Guardian Ideal,
    // and Featured Shortcuts widgets
    if (type === 'News') {
      const allWidgets = await this.get({ userId }, { db })
      const newsWidget = allWidgets.find((s: Widget) => s.type === 'News')
      if (newsWidget) throw new Error('You can only have one News widget')
    }

    if (guardianIdealWidget && type === 'GuardianIdeal') {
      throw new Error('You can only have one Guardian Ideal widget')
    }

    if (featuredShortcutsWidget && type === 'FeaturedShortcuts') {
      throw new Error('You can only have one Featured Shortcuts widget')
    }

    const created: Widget = {
      _id: ObjectId(),
      title,
      type,
    }

    try {
      // Guardian Ideal should be before collections, after Featured Shortcuts
      if (type === 'GuardianIdeal') {
        const position = featuredShortcutsWidget ? 1 : 0

        await db
          .collection('users')
          .updateOne(
            { userId },
            { $push: { mySpace: { $each: [created], $position: position } } }
          )
      } else if (type === 'FeaturedShortcuts') {
        // FeaturedShortcuts should be displayed first,
        // insert at beginning of array
        await db
          .collection('users')
          .updateOne(
            { userId },
            { $push: { mySpace: { $each: [created], $position: 0 } } }
          )
      } else {
        await db
          .collection('users')
          .updateOne({ userId }, { $push: { mySpace: created } })
      }

      return created
    } catch (e) {
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
      console.error('MySpaceModel Error: error in deleteOne', e)
      throw e
    }
  },
}
