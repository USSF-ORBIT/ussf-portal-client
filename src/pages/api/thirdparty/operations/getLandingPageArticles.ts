import { gql } from 'graphql-tag'

export const GET_LANDING_PAGE_ARTICLES = gql`
  query GetLandingPageArticles($publishedDate: DateTime) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { equals: LandingPage }
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
