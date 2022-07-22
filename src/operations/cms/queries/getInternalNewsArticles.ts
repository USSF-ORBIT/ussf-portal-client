import { gql } from '@apollo/client'

export const GET_INTERNAL_NEWS_ARTICLES = gql`
  query GetInternalNewsArticles {
    articles(
      where: {
        status: { equals: Published }
        category: { equals: InternalNews }
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
