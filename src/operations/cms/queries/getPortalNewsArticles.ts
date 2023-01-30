import { gql } from '@apollo/client'

export const GET_PORTAL_NEWS_ARTICLES = gql`
  query GetPortalNewsArticles($skip: Int, $take: Int) {
    articles(
      where: { status: { equals: Published }, category: { equals: ORBITBlog } }
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
  query GetArticlesCount {
    articlesCount(
      where: { status: { equals: Published }, category: { equals: ORBITBlog } }
    )
  }
`
