import { gql } from 'graphql-tag'

export const GET_INTERNAL_NEWS_ARTICLES = gql`
  query GetInternalNewsArticles($publishedDate: DateTime) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { name: { equals: "InternalNews" } }
      }
      orderBy: [{ publishedDate: desc }]
    ) {
      id
      slug
      title
      preview
      publishedDate
      labels {
        id
        name
        type
      }
    }
  }
`
