import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'
import type { ObjectId as ObjectIdType } from 'bson'

import type { WeatherWidget, WeatherCoords } from 'types'
import { WIDGET_TYPES } from 'constants/index'

// Types for WeatherModel
type AddOneInput = {
  coords: WeatherCoords
  userId: string
}

type EditOneInput = {
  _id: ObjectIdType
  coords: WeatherCoords
  userId: string
}

export const WeatherModel = {
  async editOne(
    { _id, userId, coords }: EditOneInput,
    { db }: Context
  ): Promise<WeatherWidget> {
    const query = {
      userId: userId,
      'mySpace._id': _id,
    }

    const updateDocument = {
      $set: {
        'mySpace.$.coords': coords,
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
      console.error('WeatherModel Error: error in editOne', e)
      throw e
    }
  },
  async addOne(
    { coords, userId }: AddOneInput,
    { db }: Context
  ): Promise<WeatherWidget> {
    // Create Widget object to add to My Space
    const newWeatherWidget = {
      _id: new ObjectId(),
      type: WIDGET_TYPES.WEATHER,
      title: 'Weather',
      coords: {
        ...coords,
      },
    }

    const query = {
      userId,
    }

    const updateDocument = {
      $push: {
        mySpace: newWeatherWidget,
      },
    }
    try {
      const result = await db
        .collection('users')
        .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

      // Filter for created Weather Widget to return
      const createdWidget = result.value.mySpace.filter(
        (weather: WeatherWidget) =>
          weather._id.toString() === newWeatherWidget._id.toString()
      )[0]

      return createdWidget
    } catch (e) {
      console.error('WeatherModel Error: error in addOne', e)
      throw e
    }
  },
}
