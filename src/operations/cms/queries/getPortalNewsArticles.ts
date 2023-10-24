import { gql } from 'graphql-tag'

export const GET_PORTAL_NEWS_ARTICLES = gql`
  query GetPortalNewsArticles(
    $skip: Int
    $take: Int
    $publishedDate: DateTime
  ) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { name: { equals: "ORBITBlog" } }
      }
      orderBy: [{ publishedDate: desc }]
      skip: $skip
      take: $take
    ) {
      id
      slug
      title
      preview
      publishedDate
    }
  }
`

export const GET_ARTICLES_COUNT = gql`
  query GetArticlesCount($publishedDate: DateTime) {
    articlesCount(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { name: { equals: "ORBITBlog" } }
      }
    )
  }
`
