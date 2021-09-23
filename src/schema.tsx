import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Bookmark {
    id: ID!
    url: String!
    label: String
    description: String
  }

  type Collection {
    id: ID!
    title: String!
    bookmarks: [Bookmark]
  }

  type Query {
    collections: [Collection!]
  }

  type Mutation {
    addCollection(title: String!, bookmarks: [BookmarkInput!]!): Collection
    removeCollection(id: ID!): Collection
    removeBookmark(id: ID!, collectionId: ID!): Bookmark
  }

  input BookmarkInput {
    url: String!
    label: String
    description: String
  }
`
