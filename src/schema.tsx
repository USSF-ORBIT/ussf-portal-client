import { gql } from '@apollo/client'

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
    News
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
    bookmarks: [Bookmark]
    cmsId: ID
  }

  type NewsWidget implements Widget {
    _id: OID!
    title: String!
    type: WidgetType!
  }

  type Query {
    collections: [Collection!]
    mySpace: [Widget!]!
  }

  type Mutation {
    addWidget(title: String!, type: WidgetType!): Widget
    removeWidget(_id: OID!): Widget
    addCollection(title: String!, bookmarks: [BookmarkInput!]!): Collection
    editCollection(
      _id: OID!
      title: String
      bookmarks: [BookmarkReorderInput]
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
    bookmarks: [BookmarkRecord]
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
    bookmarks: [BookmarkRecordInput]
    type: String
  }

  input BookmarkRecordInput {
    id: ID!
    url: String!
    label: String
  }
`
