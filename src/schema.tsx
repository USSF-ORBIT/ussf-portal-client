import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Bookmark {
    _id: ID!
    url: String!
    label: String
    description: String
  }
  type Collection {
    _id: ID!
    title: String!
    bookmarks: [Bookmark]
  }
  type Query {
    collections: [Collection!]
  }
  type Mutation {
    addCollection(title: String!, bookmarks: [BookmarkInput!]!): Collection
    editCollection(_id: ID!, title: String!): Collection
    removeCollection(_id: ID!): Collection
    removeBookmark(_id: ID!, collectionId: ID!): Bookmark
  }
  input BookmarkInput {
    url: String!
    label: String
    description: String
  }
`
