import { gql } from '@apollo/client'

export const GET_INTERNAL_NEWS_CAROUSEL_ARTICLES = gql`
  query GetInternalNewsCarouselArticles($publishedDate: DateTime) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { equals: InternalNews }
      }
      orderBy: [{ publishedDate: desc }]
      take: 4
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
      hero {
        url
      }
    }
  }
`
