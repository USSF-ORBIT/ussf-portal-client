import { GraphQLScalarType, Kind, GraphQLError } from 'graphql'
import { ObjectId, ObjectID, MongoClient } from 'mongodb'
import type { ObjectId as ObjectIdType } from 'bson'
import { titleCase } from '../helpers/index'
import { BookmarkModel } from '../models/Bookmark'
import UserModel from '../models/User'
import { CollectionModel } from '../models/Collection'
import { MySpaceModel } from 'models/MySpace'
import {
  Widget,
  SessionUser,
  PersonnelData,
  WidgetType,
  MongoBookmark,
  MySpaceWidget,
  GuardianDirectory,
} from 'types'
import { WeatherModel } from 'models/Weather'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'OID',
  description: 'Mongo object id scalar type',
  serialize(value: unknown): string {
    // check the type of received value
    if (!(value instanceof ObjectId || value instanceof ObjectID)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values')
    }
    const _id = value as ObjectIdType
    return _id.toHexString() // value sent to the client
  },
  parseValue(value: unknown): ObjectIdType {
    // check the type of received value
    // if (typeof value === 'object') return value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return ObjectId(value) // value from the client input variables
  },
  parseLiteral(ast): ObjectIdType {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return ObjectId(ast.value) // value from the client query
  },
})

// Resolver Types

type PortalUserContext = {
  db: typeof MongoClient
  user: SessionUser
  attributes: {
    edipi: string
  }
  dataSources: {
    weatherAPI: {
      getGridData: ({
        lat,
        long,
      }: {
        lat: number
        long: number
      }) => Promise<any>
    }
    keystoneAPI: {
      getLatLong: (zipcode: string) => Promise<any>
    }
    personnelAPI: {
      getUserData: (dodId: string) => Promise<any>
      getGuardianDirectory: () => Promise<any>
    }
  }
}

type AddWidgetInput = {
  title: string
  type: WidgetType
}

type AddWeatherWidgetInput = {
  zipcode: string
}
type EditWeatherWidgetInput = {
  _id: ObjectIdType
  zipcode: string
}

type AddCollectionInput = {
  title: string
  bookmarks: MongoBookmark[]
}

type EditCollectionInput = {
  _id: ObjectIdType
  title: string
  bookmarks: MongoBookmark[]
}

type AddBookmarkInput = {
  collectionId: ObjectIdType
  url: string
  label: string
  cmsId: string
}

type RemoveBookmarkInput = {
  _id: ObjectIdType
  collectionId: ObjectIdType
  cmsId: string
}

type EditBookmarkInput = {
  _id: ObjectIdType
  collectionId: ObjectIdType
  url: string
  label: string
}

type EditDisplayNameInput = {
  userId: string
  displayName: string
}

type EditThemeInput = {
  userId: string
  theme: 'light' | 'dark'
}

type EditMySpaceInput = {
  userId: string
  mySpace: MySpaceWidget[]
}

const resolvers = {
  OID: ObjectIdScalar,
  // Interface resolvers
  // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-an-interface
  Widget: {
    __resolveType(widget: Widget) {
      if (widget.type === 'Collection') return 'Collection'
      if (widget.type === 'GuardianIdeal') return 'GuardianIdeal'
      if (widget.type === 'News') return 'NewsWidget'
      if (widget.type === 'FeaturedShortcuts') return 'FeaturedShortcuts'
      if (widget.type === 'Weather') return 'WeatherWidget'
      return null // GraphQL Error
    },
  },

  // Root resolvers
  Query: {
    guardianDirectory: async (
      _: undefined,
      args: undefined,
      { dataSources }: PortalUserContext
    ) => {
      const {
        data: { getGuardianDirectory },
      } = await dataSources.personnelAPI.getGuardianDirectory()

      const guardianDirectory: GuardianDirectory[] = []
      // Pull out and format relevant data to return for directory
      getGuardianDirectory.map(
        (person: PersonnelData, index: number) =>
          // eslint-disable-next-line security/detect-object-injection
          (guardianDirectory[index] = {
            DOD_ID: person.DOD_ID,
            FirstName: titleCase(person.FirstName),
            LastName: titleCase(person.LastName),
            Rank: titleCase(`${person.Rank.Abbreviation}/${person.Rank.Grade}`),
            BaseLoc: titleCase(person.BaseLoc),
            DutyTitle: titleCase(person.DutyTitle),
            MajCom: titleCase(person.MajCom),
            Email: person.Email ? person.Email.toLowerCase() : '',
          })
      )
      return guardianDirectory
    },

    personnelData: async (
      _: undefined,
      args: undefined,
      { user, dataSources }: PortalUserContext
    ) => {
      const {
        data: {
          getUser: {
            FirstName,
            LastName,
            DOD_ID,
            MajCom,
            DutyTitle,
            Country,
            BaseLoc,
            OrgType,
            Rank,
            EOPDate,
            UserType,
            lastModifiedAt,
          },
        },
      } = await dataSources.personnelAPI.getUserData(user.attributes.edipi)

      const personnelData: PersonnelData = {
        FirstName,
        LastName,
        DOD_ID,
        MajCom,
        DutyTitle,
        Country,
        BaseLoc,
        OrgType,
        Rank: {
          Title: Rank.Title,
          Abbreviation: Rank.Abbreviation,
          Grade: Rank.Grade,
          GradeId: Rank.GradeId,
        },
        EOPDate,
        UserType,
        lastModifiedAt,
      }

      return personnelData
    },
    mySpace: async (
      _: undefined,
      args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }
      return MySpaceModel.get({ userId: user.userId }, { db })
    },
    collections: async (
      _: undefined,
      args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return CollectionModel.getAll({ userId: user.userId }, { db })
    },
    displayName: async (
      _: undefined,
      _args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return UserModel.getDisplayName(user.userId, { db })
    },
    theme: async (
      _: undefined,
      _args: undefined,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return UserModel.getTheme(user.userId, { db })
    },
  },

  Mutation: {
    addWidget: async (
      _: undefined,
      { title, type }: AddWidgetInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return MySpaceModel.addWidget(
        { title, type, userId: user.userId },
        { db }
      )
    },
    addWeatherWidget: async (
      _: undefined,
      { zipcode }: AddWeatherWidgetInput,
      { db, user, dataSources }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      // Get lat/long from Keystone
      const {
        data: {
          zipcode: { latitude, longitude },
        },
      } = await dataSources.keystoneAPI.getLatLong(zipcode)

      // Get Grid Data from NWS Weather API
      const data = await dataSources.weatherAPI.getGridData({
        lat: latitude,
        long: longitude,
      })

      // Create coords object to store with widget
      const coords = {
        lat: latitude,
        long: longitude,
        forecastUrl: data.forecast,
        hourlyForecastUrl: data.forecastHourly,
        city: data.relativeLocation.properties.city,
        state: data.relativeLocation.properties.state,
        zipcode,
      }

      return WeatherModel.addOne({ coords, userId: user.userId }, { db })
    },
    removeWidget: async (
      _: undefined,
      { _id }: { _id: ObjectIdType },
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return MySpaceModel.deleteWidget({ _id, userId: user.userId }, { db })
    },
    addCollection: async (
      _: undefined,
      { title, bookmarks }: AddCollectionInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return CollectionModel.addOne(
        { title, bookmarks, userId: user.userId },
        { db }
      )
    },
    editCollection: async (
      _: undefined,
      { _id, title, bookmarks }: EditCollectionInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return CollectionModel.editOne(
        { _id, title, bookmarks, userId: user.userId },
        { db }
      )
    },
    editWeatherWidget: async (
      _: undefined,
      { _id, zipcode }: EditWeatherWidgetInput,
      { db, user, dataSources }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      // Get lat/long from Keystone
      const {
        data: {
          zipcode: { latitude, longitude },
        },
      } = await dataSources.keystoneAPI.getLatLong(zipcode)

      // Get Grid Data from NWS Weather API
      const data = await dataSources.weatherAPI.getGridData({
        lat: latitude,
        long: longitude,
      })

      // Create coords object to store with widget
      const coords = {
        lat: latitude,
        long: longitude,
        forecastUrl: data.forecast,
        hourlyForecastUrl: data.forecastHourly,
        city: data.relativeLocation.properties.city,
        state: data.relativeLocation.properties.state,
        zipcode,
      }

      return WeatherModel.editOne({ _id, coords, userId: user.userId }, { db })
    },

    removeCollection: async (
      _: undefined,
      { _id }: { _id: ObjectIdType },
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }
      return CollectionModel.deleteOne({ _id, userId: user.userId }, { db })
    },
    addCollections: async (
      _: undefined,
      args: any, //#TODO fix type
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return CollectionModel.addMany(
        { collections: args.collections, userId: user.userId },
        { db }
      )
    },
    addBookmark: async (
      _: undefined,
      { collectionId, url, label, cmsId }: AddBookmarkInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }
      return BookmarkModel.addOne(
        { url, collectionId, userId: user.userId, label, cmsId },
        { db }
      )
    },
    removeBookmark: async (
      _: undefined,
      { _id, collectionId, cmsId }: RemoveBookmarkInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      if (cmsId) {
        return BookmarkModel.hideOne(
          { _id, collectionId, userId: user.userId },
          { db }
        )
      } else {
        return BookmarkModel.deleteOne(
          { _id, collectionId, userId: user.userId },
          { db }
        )
      }
    },
    editBookmark: async (
      _: undefined,
      { _id, collectionId, url, label }: EditBookmarkInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return BookmarkModel.editOne(
        {
          _id,
          collectionId,
          url,
          label,
          userId: user.userId,
        },
        { db }
      )
    },
    editDisplayName: async (
      _: undefined,
      { userId, displayName }: EditDisplayNameInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return UserModel.setDisplayName({ userId, displayName }, { db })
    },
    editTheme: async (
      _: undefined,
      { userId, theme }: EditThemeInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return UserModel.setTheme({ userId, theme }, { db })
    },
    editMySpace: async (
      _: undefined,
      { mySpace }: EditMySpaceInput,
      { db, user }: PortalUserContext
    ) => {
      if (!user) {
        throw new GraphQLError(
          'You must be logged in to perform this operation',
          {
            extensions: { code: 'UNAUTHENTICATED' },
          }
        )
      }

      return UserModel.setMySpace(
        { userId: user.userId, mySpace: mySpace },
        { db }
      )
    },
  },
}

export default resolvers
