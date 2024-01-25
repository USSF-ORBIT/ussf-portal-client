import { gql } from 'graphql-tag'

/* Data we will return to any third-party querying the API. */
export const typeDefs = gql`
  scalar JSON

  type CNote {
    id: ID!
    title: String!
    publishedDate: String!
    body: CNote_body_Document
  }

  type CNote_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type Query {
    cNotes: [CNote!]
    displayName: String!
  }
`
