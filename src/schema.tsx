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
  enum SectionType {
    Collection
    News
  }
  type Section {
    _id: ID!
    title: String!
    type: SectionType!
  }
  type Query {
    collections: [Collection]
    sections: [Section]
  }
  type Mutation {
    addSection(title: String!, type: SectionType!): Section
    removeSection(_id: ID!): Section
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
    description: String
  }
`
