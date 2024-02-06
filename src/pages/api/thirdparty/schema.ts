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

  type NewsArticle {
    id: ID!
    title: String!
    preview: String!
    publishedDate: String!
    labels: [NewsArticleLabel!]
    body: NewsArticle_body_Document
    tags: [NewsArticleTag!]
  }

  type NewsArticleLabel {
    id: ID!
    name: String!
    type: String!
  }

  type NewsArticle_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type NewsArticleTag {
    name: String!
  }

  type LandingPageArticle {
    id: ID!
    title: String!
    preview: String!
    publishedDate: String!
    labels: [LandingPageArticleLabel!]
    body: LandingPageArticle_body_Document
    tags: [LandingPageArticleTag!]
  }

  type LandingPageArticleLabel {
    id: ID!
    name: String!
    type: String!
  }

  type LandingPageArticle_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type LandingPageArticleTag {
    name: String!
  }

  type Query {
    cNotes: [CNote!]
    displayName: String!
    documents: [Document!]
    newsArticles: [NewsArticle!]
    landingPageArticles: [LandingPageArticle!]
  }
`
