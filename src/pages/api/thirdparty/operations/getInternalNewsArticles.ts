import { gql } from 'graphql-tag'

export const GET_INTERNAL_NEWS_ARTICLES = gql`
  query GetInternalNewsArticles($publishedDate: DateTime) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { equals: InternalNews }
      }
      orderBy: [{ publishedDate: desc }]
    ) {
      id
      title
      preview
      publishedDate
      labels {
        id
        name
        type
      }
      body {
        document
      }
      tags {
        name
      }
    }
  }
`
