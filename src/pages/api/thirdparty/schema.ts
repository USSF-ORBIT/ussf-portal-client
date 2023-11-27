import { gql } from 'graphql-tag'

/* Data we will return to any third-party querying the API. */
export const typeDefs = gql`
  scalar JSON

  type Article {
    id: ID!
    title: String!
    publishedDate: String!
    tag: String!
    body: Article_body_Document
  }

  type Article_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type Query {
    articles(tag: String): [Article]
  }
`
