import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Bookmark {
    _id: ID!
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
    _id: ID!
    title: String!
    type: WidgetType!
  }

  type Collection implements Widget {
    _id: ID!
    title: String!
    type: WidgetType!
    bookmarks: [Bookmark]
    cmsId: ID
  }

  type NewsWidget implements Widget {
    _id: ID!
    title: String!
    type: WidgetType!
  }

  type Query {
    collections: [Collection]
    mySpace: [Widget]
  }

  type Mutation {
    addWidget(title: String!, type: WidgetType!): Widget
    removeWidget(_id: ID!): Widget
    addCollection(title: String!, bookmarks: [BookmarkInput!]!): Collection
    editCollection(_id: ID!, title: String!): Collection
    removeCollection(_id: ID!): Collection
    addBookmark(
      collectionId: ID!
      url: String!
      label: String
      cmsId: ID
    ): Bookmark
    addCollections(collections: [CollectionRecord!]): [Collection]
    removeBookmark(_id: ID!, collectionId: ID!, cmsId: ID): Bookmark
    editBookmark(
      _id: ID!
      collectionId: ID!
      url: String
      label: String
    ): Bookmark
  }

  input BookmarkInput {
    url: String!
    label: String
    cmsId: ID
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
`
