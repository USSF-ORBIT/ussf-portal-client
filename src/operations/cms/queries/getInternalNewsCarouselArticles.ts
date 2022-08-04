import { gql } from '@apollo/client'

export const GET_INTERNAL_NEWS_CAROUSEL_ARTICLES = gql`
  query GetInternalNewsCarouselArticles {
    articles(
      where: {
        status: { equals: Published }
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
    }
  }
`
