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

  type Document {
    id: ID!
    title: String!
    description: String!
    file: Document_file
  }

  type Document_file {
    filename: String!
    filesize: Int!
    url: String!
  }

  type InternalNewsArticle {
    id: ID!
    title: String!
    preview: String!
    publishedDate: String!
    labels: [InternalNewsArticleLabel!]
    body: InternalNewsArticle_body_Document
    tags: [InternalNewsArticleTag!]
  }

  type InternalNewsArticleLabel {
    id: ID!
    name: String!
    type: String!
  }

  type InternalNewsArticle_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type InternalNewsArticleTag {
    name: String!
  }

  type Query {
    cNotes: [CNote!]
    displayName: String!
    documents: [Document!]
    internalNewsArticles: [InternalNewsArticle!]
  }
`
