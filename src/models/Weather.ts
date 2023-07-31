import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { ObjectId as ObjectIdType } from 'bson'

import type { WeatherWidget, WeatherCoords } from 'types'
import { WIDGET_TYPES } from 'constants/index'

// Types for WeatherModel
type AddOneInput = {
  coords: WeatherCoords
  userId: string
  title: string
}

type EditOneInput = {
  _id: ObjectIdType
  coords: WeatherCoords
  userId: string
  title: string
}

export const WeatherModel = {
  async editOne(
    { _id, userId, title, coords }: EditOneInput,
    { db }: Context
  ): Promise<WeatherWidget> {
    const query = {
      userId: userId,
      'mySpace._id': _id,
    }

    const updateDocument = coords
      ? {
          $set: {
            'mySpace.$.title': title,
            'mySpace.$.coords': coords,
          },
        }
      : {
          $set: {
            'mySpace.$.title': title,
          },
        }

    try {
      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      const updatedWeatherWidget = result.value.mySpace.filter(
        (weather: WeatherWidget) => weather._id.toString() === _id.toString()
      )[0]

      return updatedWeatherWidget
    } catch (e) {
      console.error('CollectionModel Error: error in editOne', e)
      throw e
    }
  },
  async addOne(
    { coords, userId, title }: AddOneInput,
    { db }: Context
  ): Promise<WeatherWidget> {
    try {
      const newWeatherWidget = {
        _id: new ObjectId(),
        type: WIDGET_TYPES.WEATHER,
        title,
        coords: {
          ...coords,
        },
      }

      await db.collection('users').updateOne(
        { userId },
        {
          $push: {
            mySpace: newWeatherWidget,
          },
        }
      )

      return newWeatherWidget
    } catch (e) {
      console.error('WeatherModel Error: error in addOne', e)
      throw e
    }
  },
}
