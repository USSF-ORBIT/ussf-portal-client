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
    getCollections: [Collection!]
  }

  type Mutation {
    removeBookmark(id: ID!, collectionId: ID!): Collection
  }
`
