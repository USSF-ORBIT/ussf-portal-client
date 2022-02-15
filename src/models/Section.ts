import type { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'

import type { Section, MySpace, SectionType } from 'types'

type GetAllInput = {
  userId: string
}

type FindOneInput = {
  userId: string
  _id: string
}

type AddOneInput = {
  userId: string
  title: string
  type: SectionType
}

type DeleteOneInput = {
  userId: string
  _id: string
}

/** My Space content blocks */
export const SectionModel = {
  async getAll({ userId }: GetAllInput, { db }: Context): Promise<MySpace> {
    try {
      const user = await db.collection('users').findOne({ userId })
      return user.mySpace
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('SectionModel Error: error in getAll', e)
      throw e
    }
  },

  async findOne(
    { _id, userId }: FindOneInput,
    { db }: Context
  ): Promise<Section> {
    try {
      const found = await db.collection('users').findOne({
        userId,
        'mySpace._id': new ObjectId(_id),
      })

      return found
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('SectionModel Error: error in findOne', e)
      throw e
    }
  },

  async addOne(
    { userId, title, type }: AddOneInput,
    { db }: Context
  ): Promise<Section | Error> {
    // For now, can only have one News section
    if (type === 'News') {
      const existingSections = await this.getAll({ userId }, { db })
      const newsSection = existingSections.find((s) => s.type === 'News')
      if (newsSection) return new Error('You can only have one News section')
    }

    const newSection: Section = {
      _id: new ObjectId(),
      title,
      type,
    }

    try {
      await db
        .collection('users')
        .updateOne({ userId }, { $push: { mySpace: newSection } })
      return newSection
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('SectionModel Error: error in addOne', e)
      throw e
    }
  },

  async deleteOne(
    { _id, userId }: DeleteOneInput,
    { db }: Context
  ): Promise<{ _id: string }> {
    try {
      await db
        .collection('users')
        .findOneAndUpdate(
          { userId },
          { $pull: { mySpace: { _id: new ObjectId(_id) } } },
          { returnDocument: 'after' }
        )
      return { _id }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('SectionModel Error: error in deleteOne', e)
      throw e
    }
  },
}
