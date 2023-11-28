import { gql } from 'graphql-tag'

/* Data we will return to any third-party querying the API. */
export const typeDefs = gql`
  scalar JSON

  enum ArticleTag {
    CNOTE
  }

  type Article {
    id: ID!
    title: String!
    publishedDate: String!
    tag: ArticleTag!
    body: Article_body_Document
  }

  type Article_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type Query {
    articles(tag: ArticleTag): [Article]
  }
`
