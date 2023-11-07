import { gql } from 'graphql-tag'

export const typeDefs = gql`
  scalar OID

  type Bookmark {
    _id: OID!
    url: String!
    label: String
    cmsId: ID
    isRemoved: Boolean
  }

  enum WidgetType {
    Collection
    GuardianIdeal
    News
    FeaturedShortcuts
    Weather
  }

  interface Widget {
    _id: OID!
    title: String!
    type: WidgetType!
  }

  type Collection implements Widget {
    _id: OID!
    title: String!
    type: WidgetType!
    bookmarks: [Bookmark!]
    cmsId: ID
  }

  type WeatherWidget implements Widget {
    _id: OID!
    title: String!
    type: WidgetType!
    coords: WeatherCoords!
  }

  type NewsWidget implements Widget {
    _id: OID!
    title: String!
    type: WidgetType!
  }

  type GuardianIdeal implements Widget {
    _id: OID!
    title: String!
    type: WidgetType!
  }

  type FeaturedShortcuts implements Widget {
    _id: OID!
    title: String!
    url: String!
    type: WidgetType!
  }

  type GuardianDirectory {
    DOD_ID: String
    FirstName: String
    LastName: String
    DutyTitle: String
    Rank: String
    Email: String
    BaseLoc: String
    MajCom: String
  }

  type Query {
    collections: [Collection!]!
    mySpace: [Widget!]!
    displayName: String!
    theme: String!
    personnelData: PersonnelData
    guardianDirectory: [GuardianDirectory]
  }

  type WeatherCoords {
    lat: Float!
    long: Float!
    forecastUrl: String!
    hourlyForecastUrl: String!
    city: String!
    state: String!
    zipcode: String!
  }

  type User {
    _id: OID!
    userId: String
    mySpace: [Widget]
    displayName: String
    theme: String
  }

  type Rank {
    Title: String
    Abbreviation: String
    Grade: String
    GradeId: String
  }

  type PersonnelData {
    DutyTitle: String
    DOD_ID: String
    MajCom: String
    Country: String
    BaseLoc: String
    OrgType: String
    Rank: Rank
    EOPDate: String
    LastName: String
    FirstName: String
    UserType: String
    lastModifiedAt: String
  }

  type Mutation {
    addWidget(title: String!, type: WidgetType!): Widget
    removeWidget(_id: OID!): Widget
    addWeatherWidget(
      title: String!
      type: WidgetType!
      zipcode: String!
    ): WeatherWidget
    editWeatherWidget(_id: OID!, zipcode: String!): WeatherWidget
    addCollection(title: String!, bookmarks: [BookmarkInput!]!): Collection
    editCollection(
      _id: OID!
      title: String
      bookmarks: [BookmarkReorderInput!]
    ): Collection
    removeCollection(_id: OID!): Collection
    addBookmark(
      collectionId: OID!
      url: String!
      label: String
      cmsId: ID
    ): Bookmark
    addCollections(collections: [CollectionRecordInput!]): [Collection]
    removeBookmark(_id: OID!, collectionId: OID!, cmsId: ID): Bookmark
    editBookmark(
      _id: OID!
      collectionId: OID!
      url: String
      label: String
    ): Bookmark
    editDisplayName(userId: String!, displayName: String!): User
    editTheme(userId: String!, theme: String!): User
    editMySpace(mySpace: [WidgetReorderInput!]!): User
  }

  input WeatherInput {
    lat: Float!
    long: Float!
    forecastUrl: String!
    hourlyForecastUrl: String!
    city: String!
    state: String!
    zipcode: String!
  }

  input BookmarkInput {
    url: String!
    label: String
    cmsId: ID
  }

  input BookmarkReorderInput {
    _id: OID!
    url: String!
    label: String
    cmsId: ID
    isRemoved: Boolean
  }

  input CollectionRecord {
    id: ID!
    title: String!
    bookmarks: [BookmarkRecord!]!
  }

  input BookmarkRecord {
    id: ID!
    url: String!
    label: String
    cmsId: ID
  }

  input CollectionRecordInput {
    id: ID!
    title: String!
    bookmarks: [BookmarkRecordInput!]
    type: String
  }

  input BookmarkRecordInput {
    id: ID!
    url: String!
    label: String
  }

  input WidgetReorderInput {
    _id: OID!
    title: String!
    type: WidgetType!
    cmsId: ID
    bookmarks: [BookmarkReorderInput!]
    coords: WeatherInput
  }
`
