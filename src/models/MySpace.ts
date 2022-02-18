import type { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'

import type { MySpace, Widget, WidgetType } from 'types'

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
  _id: string
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
  ): Promise<Widget | Error> {
    // For now, can only have one News widget
    if (type === 'News') {
      const allWidgets = await this.get({ userId }, { db })
      const newsWidget = allWidgets.find((s) => s.type === 'News')
      if (newsWidget) return new Error('You can only have one News section')
    }

    const created: Widget = {
      _id: new ObjectId(),
      title,
      type,
    }

    try {
      await db
        .collection('users')
        .updateOne({ userId }, { $push: { mySpace: created } })

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
  ): Promise<{ _id: string; type: WidgetType }> {
    try {
      await db
        .collection('users')
        .findOneAndUpdate(
          { userId },
          { $pull: { mySpace: { _id: new ObjectId(_id) } } },
          { returnDocument: 'after' }
        )
      return { _id, type: 'News' }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('MySpaceModel Error: error in deleteOne', e)
      throw e
    }
  },
}
