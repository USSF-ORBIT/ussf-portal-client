import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Bookmark {
    _id: ID!
    url: String!
    label: String
    cmsId: ID
    isRemoved: Boolean
  }
  type Collection {
    _id: ID!
    title: String!
    bookmarks: [Bookmark]
  }
  type Query {
    collections: [Collection]
  }
  type Mutation {
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
    description: String
  }
`
